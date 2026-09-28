'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createAppServer, isAllowedProductUrl, parseProductPrice, robotsAllows } = require('./server.js');

const productHtml = `<!doctype html><script type="application/ld+json">{"@context":"https://schema.org","@type":"Product","name":"Paracetamol 650mg Tablets","offers":{"@type":"Offer","price":"22.50","priceCurrency":"INR"}}</script>`;

test('extracts a matching INR Product offer from JSON-LD', () => {
  assert.deepEqual(parseProductPrice(productHtml, 'Paracetamol'), {
    name: 'Paracetamol 650mg Tablets', price: 22.5, currency: 'INR'
  });
});

test('rejects a non-INR or mismatched product offer', () => {
  assert.equal(parseProductPrice(productHtml.replace('INR', 'USD'), 'Paracetamol'), null);
  assert.equal(parseProductPrice(productHtml, 'Metformin'), null);
  assert.equal(parseProductPrice(productHtml.replace('"priceCurrency":"INR"', '"priceCurrency":"INR","availability":"https://schema.org/OutOfStock"'), 'Paracetamol'), null);
});

test('restricts product URLs to HTTPS pharmacy domains', () => {
  assert.equal(isAllowedProductUrl('https://www.1mg.com/drugs/example'), true);
  assert.equal(isAllowedProductUrl('https://evil.example/1mg.com'), false);
  assert.equal(isAllowedProductUrl('http://www.1mg.com/drugs/example'), false);
});

test('honors robots disallow rules and more specific allow rules', () => {
  const rules = 'User-agent: *\nDisallow: /search\nAllow: /search/product/\nDisallow: /private$\n';
  assert.equal(robotsAllows(rules, '/search/all?name=paracetamol'), false);
  assert.equal(robotsAllows(rules, '/search/product/123'), true);
  assert.equal(robotsAllows(rules, '/private'), false);
  assert.equal(robotsAllows(rules, '/private/page'), true);
  assert.equal(robotsAllows(rules, '/drugs/example'), true);
});

test('rejects redirects to hosts outside the pharmacy allowlist', async (t) => {
  let requestedExternalHost = false;
  const fakeFetch = async (url) => {
    if (url === 'https://www.1mg.com/robots.txt') return new Response('User-agent: *\nAllow: /drugs/\n', { status: 200 });
    if (url === 'https://www.1mg.com/drugs/redirect') return new Response(null, { status: 302, headers: { location: 'https://attacker.example/product' } });
    requestedExternalHost = true;
    throw new Error(`Unexpected request: ${url}`);
  };
  const server = createAppServer({
    sources: [{ generic: 'Paracetamol', url: 'https://www.1mg.com/drugs/redirect' }],
    fetchImpl: fakeFetch
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/catalog/prices`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ products: [{ generic: 'Paracetamol' }] })
  });
  const result = await response.json();
  assert.equal(result.unavailable[0].status, 'source-host-rejected');
  assert.equal(requestedExternalHost, false);
});

test('catalog API refreshes a configured product page and exposes health', async (t) => {
  const sourceHost = 'https://www.1mg.com';
  const fakeFetch = async (url) => {
    if (url === `${sourceHost}/robots.txt`) return new Response('User-agent: *\nAllow: /drugs/\n', { status: 200 });
    if (url === `${sourceHost}/drugs/paracetamol`) return new Response(productHtml, { status: 200, headers: { 'content-type': 'text/html' } });
    throw new Error(`Unexpected request: ${url}`);
  };
  const server = createAppServer({
    sources: [{ generic: 'Paracetamol', url: `${sourceHost}/drugs/paracetamol`, source: 'Test 1mg page' }],
    fetchImpl: fakeFetch
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const base = `http://127.0.0.1:${server.address().port}`;
  const health = await fetch(`${base}/api/health`).then((response) => response.json());
  assert.deepEqual(health, { ok: true, configuredSources: 1 });
  const result = await fetch(`${base}/api/catalog/prices`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ products: [{ name: 'Paracetamol 650mg', generic: 'Paracetamol' }] })
  }).then((response) => response.json());
  assert.equal(result.prices.length, 1);
  assert.equal(result.prices[0].price, 22.5);
  assert.equal(result.prices[0].currency, 'INR');
  assert.equal(result.prices[0].source, 'Test 1mg page');
});

test('serves the static app and leaves unconfigured prices untouched', async (t) => {
  const server = createAppServer({ sources: [], fetchImpl: async () => { throw new Error('No external request expected'); } });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
  const base = `http://127.0.0.1:${server.address().port}`;
  const page = await fetch(`${base}/`).then((response) => response.text());
  assert.match(page, /Ham-SaAh Rx/);
  const referenceResponse = await fetch(`${base}/drug-reference.js`);
  const referenceScript = await referenceResponse.text();
  assert.equal(referenceResponse.status, 200);
  assert.match(referenceResponse.headers.get('content-type'), /javascript/);
  assert.match(referenceScript, /window\.DRUG_REFERENCE/);
  const result = await fetch(`${base}/api/catalog/prices`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ products: [{ generic: 'Paracetamol' }] })
  }).then((response) => response.json());
  assert.deepEqual(result.prices, []);
  assert.equal(result.unavailable[0].status, 'not-configured');
});
