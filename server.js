'use strict';

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { URL } = require('node:url');

const ROOT = __dirname;
const MAX_REQUEST_BYTES = 64 * 1024;
const MAX_PAGE_BYTES = 2 * 1024 * 1024;
const ALLOWED_HOSTS = ['1mg.com', 'pharmeasy.in', 'netmeds.com', 'apollopharmacy.in'];
const MIME_TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const robotsCache = new Map();

function normalize(value) {
  return String(value || '').normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function isAllowedProductUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ALLOWED_HOSTS.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

function parseRobotsRules(contents) {
  const groups = [];
  let group = null;
  for (const rawLine of String(contents || '').split(/\r?\n/)) {
    const line = rawLine.split('#', 1)[0].trim();
    if (!line || !line.includes(':')) continue;
    const separator = line.indexOf(':');
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (key === 'user-agent') {
      if (!group || group.hasRules) {
        group = { agents: [], rules: [], hasRules: false };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else if ((key === 'allow' || key === 'disallow') && group) {
      group.hasRules = true;
      if (value) group.rules.push({ allow: key === 'allow', path: value });
    }
  }
  return groups;
}

function robotsAllows(contents, requestPath, userAgent = '*') {
  const groups = parseRobotsRules(contents);
  const exactGroups = groups.filter((group) => group.agents.some((agent) => agent !== '*' && userAgent.toLowerCase().includes(agent)));
  const selected = exactGroups.length ? exactGroups : groups.filter((group) => group.agents.includes('*'));
  const rules = selected.flatMap((group) => group.rules);
  const matches = rules.filter((rule) => {
    const exact = rule.path.endsWith('$');
    const path = exact ? rule.path.slice(0, -1) : rule.path;
    const escaped = path.split('*').map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    return new RegExp(`^${escaped}${exact ? '$' : ''}`).test(requestPath);
  });
  if (!matches.length) return true;
  matches.sort((left, right) => right.path.replace(/[*$]/g, '').length - left.path.replace(/[*$]/g, '').length);
  return matches[0].allow;
}

function priceNumber(value) {
  const amount = Number(String(value ?? '').replace(/[^\d.]/g, ''));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function collectObjects(value, found = []) {
  if (Array.isArray(value)) value.forEach((entry) => collectObjects(entry, found));
  else if (value && typeof value === 'object') {
    found.push(value);
    Object.values(value).forEach((entry) => collectObjects(entry, found));
  }
  return found;
}

function parseProductPrice(html, expectedGeneric) {
  const expected = normalize(expectedGeneric);
  if (!expected) return null;
  const scripts = String(html).matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const match of scripts) {
    let parsed;
    try { parsed = JSON.parse(match[1].trim()); } catch { continue; }
    for (const record of collectObjects(parsed)) {
      const types = Array.isArray(record['@type']) ? record['@type'] : [record['@type']];
      if (!types.some((type) => String(type || '').toLowerCase().split(/[\/#]/).pop() === 'product')) continue;
      const productText = normalize(`${record.name || ''} ${record.description || ''}`);
      if (!productText || !productText.includes(expected)) continue;
      const offers = Array.isArray(record.offers) ? record.offers : [record.offers];
      for (const offer of offers) {
        if (!offer || typeof offer !== 'object' || String(offer.priceCurrency || offer.currency || '').toUpperCase() !== 'INR') continue;
        if (/outofstock|discontinued|soldout/i.test(String(offer.availability || ''))) continue;
        const price = priceNumber(offer.price ?? offer.lowPrice);
        if (price) return { name: String(record.name).trim(), price, currency: 'INR' };
      }
    }
  }
  return null;
}

function readSources(envValue = process.env.PRICE_SOURCES_JSON || '[]') {
  let entries;
  try { entries = JSON.parse(envValue); } catch { return []; }
  if (!Array.isArray(entries)) return [];
  return entries.filter((entry) => entry && typeof entry.generic === 'string' && isAllowedProductUrl(entry.url));
}

function sendJson(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_REQUEST_BYTES) throw Object.assign(new Error('Request too large'), { statusCode: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Invalid JSON'), { statusCode: 400 }); }
}

async function fetchRobots(origin, fetchImpl) {
  if (!robotsCache.has(origin)) {
    robotsCache.set(origin, (async () => {
      const response = await fetchImpl(`${origin}/robots.txt`, {
        headers: { 'User-Agent': 'PharmacyCatalogRefresh/1.0 (+configured product-page price check)' },
        redirect: 'error',
        signal: AbortSignal.timeout(7000)
      });
      if (!response.ok) return null;
      return response.text();
    })().catch(() => null));
  }
  return robotsCache.get(origin);
}

async function fetchProductPage(sourceUrl, generic, fetchImpl) {
  let current = new URL(sourceUrl);
  for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
    if (!isAllowedProductUrl(current.href)) throw Object.assign(new Error('Unapproved source host'), { code: 'source-host-rejected' });
    const robots = await fetchRobots(current.origin, fetchImpl);
    if (robots === null) throw Object.assign(new Error('robots.txt unavailable'), { code: 'robots-unavailable' });
    if (!robotsAllows(robots, `${current.pathname}${current.search}`, 'pharmacycatalogrefresh')) {
      throw Object.assign(new Error('Product path disallowed by robots.txt'), { code: 'robots-disallowed' });
    }
    const response = await fetchImpl(current.href, {
      headers: { 'User-Agent': 'PharmacyCatalogRefresh/1.0 (+configured product-page price check)', 'Accept': 'text/html,application/xhtml+xml' },
      redirect: 'manual',
      signal: AbortSignal.timeout(10000)
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get('location');
      if (!location || redirectCount === 3) throw Object.assign(new Error('Too many redirects'), { code: 'source-redirect-error' });
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) throw Object.assign(new Error(`Source returned ${response.status}`), { code: 'source-unavailable' });
    const length = Number(response.headers.get('content-length'));
    if (length > MAX_PAGE_BYTES) throw Object.assign(new Error('Product page too large'), { code: 'source-page-too-large' });
    const html = await response.text();
    if (Buffer.byteLength(html) > MAX_PAGE_BYTES) throw Object.assign(new Error('Product page too large'), { code: 'source-page-too-large' });
    const product = parseProductPrice(html, generic);
    if (!product) throw Object.assign(new Error('No matching INR product offer found'), { code: 'price-not-found' });
    return { ...product, url: current.href };
  }
  throw Object.assign(new Error('Too many redirects'), { code: 'source-redirect-error' });
}

async function handleCatalogRefresh(request, response, sources, fetchImpl) {
  let payload;
  try { payload = await readJsonBody(request); }
  catch (error) { return sendJson(response, error.statusCode || 400, { error: error.message }); }
  if (!payload || !Array.isArray(payload.products) || payload.products.length > 100) {
    return sendJson(response, 400, { error: 'Expected a products array with at most 100 entries.' });
  }
  const results = await Promise.all(payload.products.map(async (product) => {
    const generic = typeof product?.generic === 'string' ? product.generic.trim() : '';
    if (!generic) return { generic: '', status: 'invalid-product' };
    const source = sources.find((item) => normalize(item.generic) === normalize(generic));
    if (!source) return { generic, status: 'not-configured' };
    try {
      const result = await fetchProductPage(source.url, generic, fetchImpl);
      return { generic, ...result, source: source.source || new URL(source.url).hostname, updatedAt: new Date().toISOString(), status: 'updated' };
    } catch (error) {
      return { generic, status: error.code || 'source-unavailable' };
    }
  }));
  const prices = results.filter((item) => item.status === 'updated');
  const unavailable = results.filter((item) => item.status !== 'updated');
  return sendJson(response, 200, { prices, unavailable, configuredSources: sources.length, checkedAt: new Date().toISOString() });
}

function createAppServer({ sources = readSources(), fetchImpl = fetch } = {}) {
  return http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/api/health' && request.method === 'GET') {
      return sendJson(response, 200, { ok: true, configuredSources: sources.length });
    }
    if (url.pathname === '/api/catalog/prices' && request.method === 'POST') {
      return handleCatalogRefresh(request, response, sources, fetchImpl);
    }
    if (url.pathname.startsWith('/api/')) return sendJson(response, 404, { error: 'API route not found.' });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end('Method not allowed');
    }
    const requested = url.pathname === '/' ? '/index.html' : url.pathname;
    if (!['/index.html', '/app.js', '/styles.css', '/drug-reference.js'].includes(requested)) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end('Not found');
    }
    try {
      const body = await fs.readFile(path.join(ROOT, requested.slice(1)));
      response.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(requested)], 'X-Content-Type-Options': 'nosniff' });
      return response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end('Not found');
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 8000;
  const server = createAppServer();
  server.listen(port, '0.0.0.0', () => {
    console.log(`Ham-SaAh Rx server listening on http://localhost:${port} (${readSources().length} configured price sources)`);
  });
}

module.exports = { createAppServer, isAllowedProductUrl, parseProductPrice, parseRobotsRules, readSources, robotsAllows };
