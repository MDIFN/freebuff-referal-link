const STORAGE_KEY = 'hamsaahrx-pharmacy-demo-v1';
const LEGACY_STORAGE_KEY = 'fieldnote-pharmacy-demo-v1';
const INR_PER_LEGACY_UNIT = 84;
const DRUG_REFERENCE = window.DRUG_REFERENCE || [];

const initialData = {
  currency: 'legacy',
  superadmins: [
    { id: 'SA-001', name: 'System Superadmin', email: 'superadmin@hamsaahrx.demo', password: 'super123', role: 'Superadmin', active: true }
  ],
  companyProfiles: [],
  activeCompanyId: '',
  employees: [
    { id: 'EMP-001', name: 'Maya Chen', email: 'maya@hamsaahrx.demo', password: 'maya123', role: 'Admin', active: true },
    { id: 'EMP-002', name: 'Asha Patel', email: 'asha@hamsaahrx.demo', password: 'asha123', role: 'Pharmacist', active: true },
    { id: 'EMP-003', name: 'Leo Martin', email: 'leo@hamsaahrx.demo', password: 'leo123', role: 'Technician', active: true },
    { id: 'EMP-004', name: 'Nia Brooks', email: 'nia@hamsaahrx.demo', password: 'nia123', role: 'Cashier', active: true }
  ],
  patients: [
    { id: 'PT-2048', name: 'Olivia Martin', age: 34, phone: '(415) 555-0142', allergies: 'Penicillin', lastVisit: 'Today, 10:42 AM', initials: 'OM' },
    { id: 'PT-2047', name: 'Noah Williams', age: 62, phone: '(415) 555-0186', allergies: 'None recorded', lastVisit: 'Today, 9:18 AM', initials: 'NW' },
    { id: 'PT-2046', name: 'Amara Patel', age: 28, phone: '(415) 555-0127', allergies: 'Sulfa drugs', lastVisit: 'Yesterday', initials: 'AP' },
    { id: 'PT-2045', name: 'James Robinson', age: 51, phone: '(415) 555-0163', allergies: 'Latex', lastVisit: 'Sep 24, 2026', initials: 'JR' },
    { id: 'PT-2044', name: 'Sofia Nguyen', age: 43, phone: '(415) 555-0109', allergies: 'None recorded', lastVisit: 'Sep 23, 2026', initials: 'SN' }
  ],
  doctors: [
    { id: 'DR-012', name: 'Dr. Elena Vasquez', specialty: 'Internal medicine', phone: '(415) 555-0132', email: 'evasquez@northside.health', referrals: 38 },
    { id: 'DR-011', name: 'Dr. Samuel Reed', specialty: 'Family medicine', phone: '(415) 555-0175', email: 'sreed@northside.health', referrals: 26 },
    { id: 'DR-010', name: 'Dr. Priya Shah', specialty: 'Cardiology', phone: '(415) 555-0191', email: 'pshah@northside.health', referrals: 19 }
  ],
  drugs: [
    { id: 'RX-001', name: 'Amoxicillin 500mg', generic: 'Amoxicillin', category: 'Antibiotic', onHand: 12, reorder: 24, batch: 'AMX-2408A', expiry: 'Oct 14, 2026', price: 12.5, supplier: 'MedSource Co.' },
    { id: 'RX-002', name: 'Atorvastatin 20mg', generic: 'Atorvastatin', category: 'Cardiovascular', onHand: 86, reorder: 30, batch: 'ATV-2501C', expiry: 'Jan 20, 2027', price: 18, supplier: 'MedSource Co.', strength: '20 mg', specification: 'Film-coated tablet; each tablet contains atorvastatin calcium equivalent to atorvastatin 10 mg, 20 mg, or 40 mg.', indication: 'Adjunct to diet to reduce elevated total cholesterol and triglycerides in primary hypercholesterolemia and mixed dyslipidemia.', referenceSource: 'CDSCO approval master' },
    { id: 'RX-003', name: 'Metformin 850mg', generic: 'Metformin', category: 'Diabetes care', onHand: 9, reorder: 25, batch: 'MET-2411B', expiry: 'Nov 08, 2026', price: 9.75, supplier: 'WellCare Distribution' },
    { id: 'RX-004', name: 'Cetirizine 10mg', generic: 'Cetirizine', category: 'Allergy', onHand: 142, reorder: 35, batch: 'CTZ-2503D', expiry: 'Mar 11, 2027', price: 7.25, supplier: 'Northwest Pharma' },
    { id: 'RX-005', name: 'Lisinopril 10mg', generic: 'Lisinopril', category: 'Cardiovascular', onHand: 7, reorder: 20, batch: 'LIS-2412A', expiry: 'Dec 17, 2026', price: 11, supplier: 'MedSource Co.', strength: '10 mg', specification: 'Tablet; contains lisinopril dihydrate equivalent to lisinopril 10 mg or 20 mg.', indication: 'Essential hypertension and congestive heart failure.', referenceSource: 'CDSCO approval master' },
    { id: 'RX-006', name: 'Omeprazole 20mg', generic: 'Omeprazole', category: 'Gastrointestinal', onHand: 64, reorder: 24, batch: 'OMP-2502B', expiry: 'Feb 18, 2027', price: 10.5, supplier: 'WellCare Distribution' },
    { id: 'RX-007', name: 'Vitamin D3 1000 IU', generic: 'Cholecalciferol', category: 'Supplement', onHand: 18, reorder: 28, batch: 'VTD-2504F', expiry: 'Apr 30, 2027', price: 8.25, supplier: 'Northwest Pharma' },
    { id: 'RX-008', name: 'Ibuprofen 200mg', generic: 'Ibuprofen', category: 'Pain relief', onHand: 210, reorder: 40, batch: 'IBU-2505E', expiry: 'May 12, 2027', price: 6.5, supplier: 'WellCare Distribution', strength: '200 mg', specification: 'Tablet; each tablet contains ibuprofen 200 mg.', indication: 'Anti-rheumatic.', referenceSource: 'CDSCO approval master and PMBI tender list' },
    { id: 'RX-009', name: 'Albuterol inhaler', generic: 'Albuterol', category: 'Respiratory', onHand: 23, reorder: 12, batch: 'ALB-2501A', expiry: 'Jan 05, 2027', price: 26, supplier: 'MedSource Co.' }
  ],
  prescriptions: [
    { id: 'PR-8742', patient: 'Olivia Martin', patientId: 'PT-2048', doctor: 'Dr. Elena Vasquez', medication: 'Amoxicillin 500mg', directions: '1 capsule, 3 times daily · 7 days', received: '10:42 AM', status: 'Pending review', allergy: 'Penicillin allergy on file' },
    { id: 'PR-8741', patient: 'Noah Williams', patientId: 'PT-2047', doctor: 'Dr. Samuel Reed', medication: 'Atorvastatin 20mg', directions: '1 tablet, once daily · 30 days', received: '9:18 AM', status: 'Pending review', allergy: '' },
    { id: 'PR-8740', patient: 'Amara Patel', patientId: 'PT-2046', doctor: 'Dr. Priya Shah', medication: 'Lisinopril 10mg', directions: '1 tablet, once daily · 30 days', received: 'Yesterday', status: 'Approved', allergy: '' },
    { id: 'PR-8739', patient: 'James Robinson', patientId: 'PT-2045', doctor: 'Dr. Elena Vasquez', medication: 'Metformin 850mg', directions: '1 tablet, twice daily · 30 days', received: 'Yesterday', status: 'Dispensed', allergy: '' }
  ],
  suppliers: [
    { id: 'SU-021', name: 'MedSource Co.', contact: 'Derek Miles', email: 'orders@medsource.example', phone: '(800) 555-0140', terms: 'Net 30', active: true },
    { id: 'SU-020', name: 'WellCare Distribution', contact: 'Alicia Grant', email: 'pharmacy@wellcare.example', phone: '(800) 555-0165', terms: 'Net 15', active: true },
    { id: 'SU-019', name: 'Northwest Pharma', contact: 'Ravi Desai', email: 'orders@nwpharma.example', phone: '(800) 555-0182', terms: 'Net 30', active: true }
  ],
  purchaseOrders: [
    { id: 'PO-1042', supplier: 'MedSource Co.', status: 'Pending approval', created: 'Sep 25, 2026', items: [{ drugId: 'RX-001', name: 'Amoxicillin 500mg', quantity: 48, cost: 5.5 }, { drugId: 'RX-005', name: 'Lisinopril 10mg', quantity: 36, cost: 4.1 }], createdBy: 'Maya Chen' },
    { id: 'PO-1041', supplier: 'WellCare Distribution', status: 'Sent', created: 'Sep 23, 2026', items: [{ drugId: 'RX-003', name: 'Metformin 850mg', quantity: 60, cost: 4.25 }], createdBy: 'Maya Chen' }
  ],
    sales: [
      { id: 'INV-8291', patient: 'Noah Williams', time: '11:24 AM', items: 2, total: 31.05, payment: 'Card', status: 'Paid', employeeId: 'EMP-004' },
      { id: 'INV-8290', patient: 'Walk-in customer', time: '11:08 AM', items: 1, total: 7.83, payment: 'Cash', status: 'Paid', employeeId: 'EMP-004' },
      { id: 'INV-8289', patient: 'Sofia Nguyen', time: '10:56 AM', items: 3, total: 42.16, payment: 'Insurance', status: 'Paid', employeeId: 'EMP-004' },
      { id: 'INV-8288', patient: 'Walk-in customer', time: '10:31 AM', items: 2, total: 19.45, payment: 'Card', status: 'Paid', employeeId: 'EMP-004' }
    ],
  cart: []
};

const COMPANY_DATA_KEYS = ['currency', 'employees', 'patients', 'doctors', 'drugs', 'prescriptions', 'suppliers', 'purchaseOrders', 'sales', 'cart'];

function snapshotCompanyData(source) {
  return Object.fromEntries(COMPANY_DATA_KEYS.map((key) => [key, structuredClone(source[key] ?? (key === 'currency' ? 'INR' : []))]));
}

function createEmptyCompanyData(admin) {
  return {
    currency: 'INR',
    employees: admin ? [{ ...admin, role: 'Admin', active: true }] : [],
    patients: [], doctors: [], drugs: [], prescriptions: [], suppliers: [], purchaseOrders: [], sales: [], cart: []
  };
}

function ensureCompanyProfiles(record) {
  record.superadmins ||= structuredClone(initialData.superadmins);
  record.companyProfiles ||= [];
  if (!record.companyProfiles.length) {
    const profile = { id: 'company-northside', name: 'Northside Pharmacy', companyData: snapshotCompanyData(record) };
    record.companyProfiles.push(profile);
    record.activeCompanyId = profile.id;
  }
  record.companyProfiles.forEach((company) => {
    company.companyData ||= createEmptyCompanyData(null);
  });
  let active = record.companyProfiles.find((company) => company.id === record.activeCompanyId);
  if (!active) {
    active = record.companyProfiles[0];
    record.activeCompanyId = active.id;
  }
  if (active.companyData) Object.assign(record, structuredClone(active.companyData));
  active.companyData = snapshotCompanyData(record);
  return record;
}

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY));
    if (stored && stored.drugs && stored.patients && stored.purchaseOrders && stored.employees) {
      const restored = { ...structuredClone(initialData), ...stored };
      initialData.drugs.forEach((referenceDrug) => {
        const storedDrug = restored.drugs.find((drug) => drug.id === referenceDrug.id);
        if (!storedDrug) return;
        ['strength', 'specification', 'indication', 'referenceSource'].forEach((key) => {
          if (referenceDrug[key] && !storedDrug[key]) storedDrug[key] = referenceDrug[key];
        });
      });
      migrateCurrency(restored);
      migrateAccountEmails(restored);
      return ensureCompanyProfiles(restored);
    }
  } catch { /* A malformed demo save should not block the app. */ }
  const fresh = structuredClone(initialData);
  migrateCurrency(fresh);
  migrateAccountEmails(fresh);
  return ensureCompanyProfiles(fresh);
}

const data = loadData();
const state = { view: 'overview', role: 'Admin', employeeId: null, inventoryQuery: '', patientQuery: '', doctorQuery: '', supplierQuery: '', prescriptionFilter: 'All prescriptions', poFilter: 'All orders', globalQuery: '', posDiscountPercent: 0, posDiscountFlat: 0 };
let viewportNoticeDismissed = false;
const permissions = {
  Admin: ['overview', 'pos', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'suppliers', 'reports', 'employees'],
  Superadmin: ['overview', 'pos', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'suppliers', 'reports', 'employees', 'companies'],
  Pharmacist: ['overview', 'pos', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'reports'],
  Technician: ['overview', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'reports'],
  Cashier: ['overview', 'pos', 'inventory', 'reports']
};
const headings = {
  overview: ['Your pharmacy at a glance', 'Here’s what’s happening at your pharmacy today.'],
  pos: ['Point of sale', 'Build a basket, collect payment, and keep stock in sync.'],
  prescriptions: ['Prescription review', 'Check each order against patient history before dispensing.'],
  inventory: ['Inventory', 'Stock levels, batches, and expiry dates across your pharmacy.'],
  'purchase-orders': ['Purchase orders', 'Keep restocking requests moving from shelf to supplier.'],
  patients: ['Patients', 'A clear view of the people in your care.'],
  doctors: ['Doctors', 'Referring clinicians and their pharmacy activity.'],
  suppliers: ['Suppliers', 'Manage your approved distribution partners.'],
  reports: ['Reports & analytics', 'A useful read on sales and inventory performance.'],
  employees: ['Employee access', 'Manage the people who can sign in to Ham-SaAh Rx.'],
  companies: ['Company profiles', 'Separate workspaces for each pharmacy company.']
};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);
const save = () => {
  const active = data.companyProfiles.find((company) => company.id === data.activeCompanyId);
  if (active) active.companyData = snapshotCompanyData(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};
const activeCompany = () => data.companyProfiles.find((company) => company.id === data.activeCompanyId);
const activeCompanyName = () => activeCompany()?.name || 'Company';
const isAdminRole = () => ['Admin', 'Superadmin'].includes(state.role);
const canPerformRole = (...roles) => state.role === 'Superadmin' || roles.includes(state.role);
function switchCompanyProfile(companyId) {
  const current = activeCompany();
  const next = data.companyProfiles.find((company) => company.id === companyId && company.companyData);
  if (state.employeeId && state.role !== 'Superadmin') return;
  if (!next || !current) return;
  current.companyData = snapshotCompanyData(data);
  data.activeCompanyId = next.id;
  Object.assign(data, structuredClone(next.companyData));
  state.view = 'overview';
  state.inventoryQuery = '';
  state.patientQuery = '';
  state.doctorQuery = '';
  state.supplierQuery = '';
  save();
  render();
  notify(`Switched to ${next.name}.`);
}
const pendingCount = () => data.prescriptions.filter((item) => item.status === 'Pending review').length;
const lowStock = () => data.drugs.filter((drug) => drug.onHand <= drug.reorder);
const initialsFor = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
function nextRecordId(records, prefix) {
  const width = prefix === 'PT' ? 4 : 3;
  const pattern = new RegExp(`^${prefix}-(\\d+)$`);
  const highestId = records.reduce((highest, record) => {
    const numericId = Number(pattern.exec(record.id)?.[1]) || 0;
    return Math.max(highest, numericId);
  }, 0);
  return `${prefix}-${String(highestId + 1).padStart(width, '0')}`;
}
const drugFor = (id) => data.drugs.find((drug) => drug.id === id);
const doctorFor = (id) => data.doctors.find((doctor) => doctor.id === id);
const doctorReferralLink = (doctor) => `https://freebuff.app/r/${encodeURIComponent((doctor?.id || 'doctor').toLowerCase())}`;
const INDIAN_DRUG_CATALOG = [
  { name: 'Paracetamol 650mg', generic: 'Paracetamol', category: 'Pain relief', price: 22.5, supplier: 'Apollo Pharmacy' },
  { name: 'Cetrizine 10mg', generic: 'Cetirizine', category: 'Allergy', price: 28.0, supplier: 'PharmEasy' },
  { name: 'Amoxicillin 500mg', generic: 'Amoxicillin', category: 'Antibiotic', price: 86.0, supplier: '1mg' },
  { name: 'Atorvastatin 20mg', generic: 'Atorvastatin', category: 'Cardiovascular', price: 64.0, supplier: 'Netmeds' },
  { name: 'Metformin 850mg', generic: 'Metformin', category: 'Diabetes care', price: 39.0, supplier: 'Netmeds' },
  { name: 'Lisinopril 10mg', generic: 'Lisinopril', category: 'Cardiovascular', price: 54.5, supplier: 'Apollo Pharmacy' },
  { name: 'Omeprazole 20mg', generic: 'Omeprazole', category: 'Gastrointestinal', price: 46.0, supplier: '1mg' },
  { name: 'Ibuprofen 200mg', generic: 'Ibuprofen', category: 'Pain relief', price: 33.0, supplier: 'Apollo Pharmacy' },
  { name: 'Vitamin D3 60k IU', generic: 'Cholecalciferol', category: 'Supplement', price: 94.0, supplier: 'PharmEasy' },
  { name: 'Amlodipine 5mg', generic: 'Amlodipine', category: 'Cardiovascular', price: 48.0, supplier: 'Netmeds' }
];

function calculateSaleSummary(cartItems, discountPercent = 0, discountFlat = 0) {
  const subtotal = cartItems.reduce((sum, line) => sum + (line.drug?.price || 0) * line.quantity, 0);
  const percentDiscount = Math.max(0, Number(discountPercent) || 0);
  const flatDiscount = Math.max(0, Number(discountFlat) || 0);
  const percentValue = subtotal * (percentDiscount / 100);
  const discount = Math.min(subtotal, percentValue + flatDiscount);
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * .0825;
  const total = taxable + tax;
  return { subtotal, discount, tax, total, taxable };
}

function syncIndianDrugCatalog() {
  let added = 0;
  INDIAN_DRUG_CATALOG.forEach((entry) => {
    const existing = data.drugs.find((drug) => drug.name.toLowerCase() === entry.name.toLowerCase() || drug.generic.toLowerCase() === entry.generic.toLowerCase());
    if (existing) {
      existing.category = entry.category;
      existing.supplier = entry.supplier || existing.supplier;
      return;
    }
    data.drugs.push({
      id: `RX-${String(data.drugs.length + 1).padStart(3, '0')}`,
      name: entry.name,
      generic: entry.generic,
      category: entry.category,
      onHand: 40,
      reorder: 20,
      batch: `IND-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}`,
      expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      price: Number(entry.price),
      priceSource: 'local-reference',
      priceUpdatedAt: null,
      supplier: entry.supplier
    });
    added += 1;
  });
  return added;
}

function drugPriceLabel(drug) {
  if (!drug.priceSource?.startsWith('live:')) return 'Reference price';
  const updatedAt = new Date(drug.priceUpdatedAt);
  const timestamp = Number.isNaN(updatedAt.getTime()) ? 'time unavailable' : updatedAt.toLocaleString();
  return `${drug.priceSource.slice(5)} · ${timestamp}`;
}

async function refreshIndianDrugCatalog(button) {
  const originalLabel = button?.textContent || 'Sync INR catalog';
  if (button) {
    button.disabled = true;
    button.textContent = 'Checking sources…';
  }
  let liveUpdated = 0;
  try {
    const response = await fetch('/api/catalog/prices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: INDIAN_DRUG_CATALOG.map(({ name, generic }) => ({ name, generic })) })
    });
    if (!response.ok) throw new Error(`Price service returned ${response.status}`);
    const result = await response.json();
    syncIndianDrugCatalog();
    result.prices?.forEach((price) => {
      if (price.currency !== 'INR' || !(Number(price.price) > 0)) return;
      const entry = INDIAN_DRUG_CATALOG.find((item) => item.generic.toLowerCase() === String(price.generic).toLowerCase());
      if (!entry) return;
      const drug = data.drugs.find((item) => item.generic.toLowerCase() === entry.generic.toLowerCase());
      if (!drug) return;
      drug.price = Number(price.price);
      drug.priceSource = `live:${price.source || 'pharmacy product page'}`;
      drug.priceUpdatedAt = price.updatedAt || result.checkedAt || new Date().toISOString();
      liveUpdated += 1;
    });
  } catch {
    syncIndianDrugCatalog();
  }
  save();
  render();
  if (liveUpdated) notify(`Verified ${liveUpdated} live INR price${liveUpdated === 1 ? '' : 's'}; other products use reference prices.`);
  else notify('No live INR prices were verified. Local reference prices remain in use.');
  if (button?.isConnected) {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const helper = document.createElement('textarea');
  helper.value = text;
  helper.setAttribute('readonly', '');
  helper.style.position = 'fixed';
  helper.style.opacity = '0';
  document.body.append(helper);
  helper.select();
  document.execCommand('copy');
  helper.remove();
}

function migrateCurrency(record) {
  if (record.currency === 'INR') return;
  record.drugs?.forEach((drug) => { drug.price = Math.round(drug.price * INR_PER_LEGACY_UNIT * 100) / 100; });
  record.sales?.forEach((sale) => {
    sale.total = Math.round(sale.total * INR_PER_LEGACY_UNIT * 100) / 100;
    sale.employeeId ||= 'EMP-004';
  });
  record.purchaseOrders?.forEach((order) => order.items?.forEach((item) => { item.cost = Math.round(item.cost * INR_PER_LEGACY_UNIT * 100) / 100; }));
  record.currency = 'INR';
}

function migrateAccountEmails(record) {
  record.employees?.forEach((employee) => {
    employee.email = employee.email.replace(/@fieldnote\.demo$/i, '@hamsaahrx.demo');
  });
}

function notify(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  $('#toast-region').append(toast);
  setTimeout(() => toast.remove(), 3100);
}

function statusClass(status) {
  if (/pending approval/i.test(status)) return 'pending';
  if (/pending review/i.test(status)) return 'review';
  if (/rejected/i.test(status)) return 'rejected';
  if (/sent/i.test(status)) return 'sent';
  if (/low stock/i.test(status)) return 'low';
  if (/no stock/i.test(status)) return 'no-stock';
  return '';
}

function statusBadge(status) {
  return `<span class="status ${statusClass(status)}">${escapeHtml(status)}</span>`;
}

function setHeading() {
  const [title, subtitle] = headings[state.view] || headings.overview;
  const isOverview = state.view === 'overview';
  const employee = data.employees.find((item) => item.id === state.employeeId) || data.superadmins.find((item) => item.id === state.employeeId);
  $('#page-title').textContent = isOverview ? `Good morning, ${employee?.name.split(' ')[0] || state.role}` : title;
  $('#page-subtitle').textContent = isOverview ? subtitle : state.role === 'Technician' && state.view === 'purchase-orders' ? 'Add stock needs to the queue for admin review.' : subtitle;
  $('#breadcrumb-current').textContent = isOverview ? 'Overview' : title;
  $('#page-eyebrow').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()).toUpperCase();
  const headingActions = $('#heading-actions');
  if (state.view === 'companies' && state.role === 'Superadmin') headingActions.innerHTML = '<button class="button button-primary" data-action="add-company">＋ Add company</button>';
  else if (state.view === 'pos' && canPerformRole('Admin', 'Cashier', 'Pharmacist')) headingActions.innerHTML = `<button class="button" data-action="clear-cart">Clear basket</button>`;
  else if (state.view === 'inventory' && canPerformRole('Admin', 'Technician', 'Pharmacist')) headingActions.innerHTML = `${canPerformRole('Admin', 'Pharmacist') ? '<button class="button" data-action="browse-reference">Drug reference</button>' : ''}<button class="button button-primary" data-action="receive-stock">＋ Receive stock</button><button class="button" data-action="sync-indian-catalog" style="margin-left:8px">Sync INR catalog</button>`;
  else if (state.view === 'patients' && canPerformRole('Admin', 'Pharmacist', 'Technician')) headingActions.innerHTML = `<button class="button button-primary" data-action="add-patient">＋ Add patient</button>`;
  else if (state.view === 'doctors' && canPerformRole('Admin', 'Pharmacist')) headingActions.innerHTML = `<button class="button button-primary" data-action="add-doctor">＋ Add doctor</button>`;
  else if (state.view === 'suppliers' && canPerformRole('Admin')) headingActions.innerHTML = `<button class="button button-primary" data-action="add-supplier">＋ Add supplier</button>`;
  else if (state.view === 'purchase-orders' && canPerformRole('Admin', 'Pharmacist', 'Technician')) headingActions.innerHTML = `<button class="button button-primary" data-action="new-po">＋ New purchase order</button>`;
  else if (state.view === 'employees' && canPerformRole('Admin')) headingActions.innerHTML = `<button class="button button-primary" data-action="add-employee">＋ Add employee</button>`;
  else headingActions.innerHTML = '';
}

function updateNavigation() {
  const allowed = permissions[state.role];
  $$('.nav-item').forEach((button) => {
    button.hidden = !allowed.includes(button.dataset.view);
    button.classList.toggle('active', button.dataset.view === state.view);
  });
  $$('.nav-label', $('.primary-nav')).forEach((label) => {
    let item = label.nextElementSibling;
    let hasVisibleItem = false;
    while (item && !item.classList.contains('nav-label')) {
      if (item.matches('.nav-item') && !item.hidden) hasVisibleItem = true;
      item = item.nextElementSibling;
    }
    label.hidden = !hasVisibleItem;
  });
  if (!allowed.includes(state.view)) state.view = 'overview';
  $('#prescription-count').textContent = pendingCount();
  $('#prescription-count').hidden = pendingCount() === 0;
  $('#stock-count').textContent = lowStock().length;
  $('#stock-count').hidden = lowStock().length === 0;
  const employee = data.employees.find((item) => item.id === state.employeeId) || data.superadmins.find((item) => item.id === state.employeeId);
  $('#company-name').textContent = activeCompanyName();
  $('#company-breadcrumb').textContent = activeCompanyName();
  $('#company-icon').textContent = initialsFor(activeCompanyName())[0] || 'C';
  $('#profile-name').textContent = employee?.name || 'Signed out';
  $('#profile-role').textContent = employee?.role || '';
  $('#profile-initials').textContent = initialsFor(employee?.name || '');
  $('#session-role').textContent = state.role;
}

function render() {
  updateNavigation();
  setHeading();
  const views = {
    overview: renderOverview,
    pos: renderPos,
    prescriptions: renderPrescriptions,
    inventory: renderInventory,
    'purchase-orders': renderPurchaseOrders,
    patients: renderPatients,
    doctors: renderDoctors,
    suppliers: renderSuppliers,
    reports: renderReports,
    employees: renderEmployees,
    companies: renderCompanies
  };
  $('#content').innerHTML = (views[state.view] || renderOverview)();
  if (state.view === 'inventory') {
    const visibleDrugs = data.drugs.filter((drug) => `${drug.name} ${drug.generic} ${drug.category} ${drug.batch}`.toLowerCase().includes(state.inventoryQuery.toLowerCase()));
    $$('#inventory-rows tr').forEach((row, index) => {
      if (!visibleDrugs[index]) return;
      const provenance = document.createElement('small');
      provenance.className = 'cell-sub';
      provenance.textContent = drugPriceLabel(visibleDrugs[index]);
      row.children[5].append(provenance);
    });
  }
  if (state.view === 'pos' && state.role === 'Cashier') {
    const patientSelect = $('#pos-patient', $('#content'));
    if (patientSelect) {
      const customerName = document.createElement('input');
      customerName.id = 'pos-patient';
      customerName.type = 'text';
      customerName.value = 'Walk-in customer';
      customerName.autocomplete = 'off';
      patientSelect.replaceWith(customerName);
      $('label[for="pos-patient"]', $('#content')).textContent = 'Customer name (optional)';
    }
  }
  if (state.view === 'purchase-orders' && canPerformRole('Admin')) {
    $$('.po-card', $('#content')).forEach((card) => {
      const orderId = card.querySelector('.po-number')?.textContent.match(/PO-\d+/)?.[0];
      const actions = card.querySelector('.po-card-actions');
      if (orderId && actions && !actions.querySelector('[data-action="view-audit"]')) {
        actions.insertAdjacentHTML('beforeend', `<button class="button button-small" data-action="view-audit" data-id="${escapeHtml(orderId)}">Audit trail</button>`);
      }
    });
  }
  $('#sidebar').classList.remove('open');
  updateViewportNotice();
}

function updateViewportNotice() {
  const notice = $('#viewport-notice');
  if (!notice || viewportNoticeDismissed || $('#app-shell').hidden) return;
  const narrow = window.innerWidth < 800 || (window.matchMedia('(pointer: coarse)').matches && window.innerWidth < 1024);
  notice.hidden = !narrow;
}

function metric(label, value, foot, icon, color, trend = '') {
  return `<div class="metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon ${color}">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${trend ? `<span class="${trend.startsWith('↑') ? 'trend-up' : 'trend-down'}">${trend}</span>` : ''}${foot}</div></div>`;
}

function renderOverview() {
  const alerts = lowStock().slice(0, 3);
  const visibleSales = state.role === 'Cashier' ? data.sales.filter((sale) => sale.employeeId === state.employeeId) : data.sales;
  const recentSales = visibleSales.slice(0, 4);
  const salesTotal = visibleSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageSale = visibleSales.length ? salesTotal / visibleSales.length : 0;
  const prescriptionTotal = data.prescriptions.length;
  const isTechnician = state.role === 'Technician';
  const metrics = isTechnician
    ? `${metric('Products tracked', String(data.drugs.length), 'across active batches', 'Rx', 'green')}${metric('Items to reorder', String(lowStock().length).padStart(2, '0'), 'below reorder threshold', '!', 'orange')}${metric('Open purchase orders', String(data.purchaseOrders.filter((order) => order.status !== 'Sent').length), 'draft or awaiting approval', '⇄', 'blue')}${metric('Units on hand', String(data.drugs.reduce((sum, drug) => sum + drug.onHand, 0)), 'across the dispensary', '▤', 'lime')}`
    : state.role === 'Cashier'
      ? `${metric('Shift sales', money(salesTotal), 'current company shift', '↗', 'green')}${metric('Transactions', String(visibleSales.length), 'this shift', '▣', 'blue')}${metric('Avg. basket', money(averageSale), 'current shift', '◷', 'lime')}${metric('Products in stock', String(data.drugs.filter((drug) => drug.onHand > 0).length), 'available to sell', 'Rx', 'orange')}`
      : `${metric('Sales recorded', money(salesTotal), activeCompanyName(), '↗', 'green')}${metric('Prescriptions', String(prescriptionTotal), 'in this company', 'Rx', 'blue')}${metric('Items to reorder', String(lowStock().length).padStart(2, '0'), 'below reorder threshold', '!', 'orange', '')}${metric('Avg. basket', money(averageSale), 'recorded sales', '◷', 'lime')}`;
  const quickActions = [];
  if (permissions[state.role].includes('pos')) quickActions.push('<button class="quick-action" data-nav="pos"><span class="quick-action-icon">▣</span><span>New sale</span></button>');
  if (canPerformRole('Admin', 'Pharmacist', 'Technician')) quickActions.push('<button class="quick-action" data-action="add-patient"><span class="quick-action-icon">♙</span><span>Add patient</span></button>');
  else if (permissions[state.role].includes('patients')) quickActions.push('<button class="quick-action" data-nav="patients"><span class="quick-action-icon">♙</span><span>Find patient</span></button>');
  if (permissions[state.role].includes('prescriptions')) quickActions.push('<button class="quick-action" data-nav="prescriptions"><span class="quick-action-icon">Rx</span><span>Review Rx</span></button>');
  if (permissions[state.role].includes('purchase-orders')) quickActions.push('<button class="quick-action" data-nav="purchase-orders"><span class="quick-action-icon">⇄</span><span>Restock queue</span></button>');
  if (state.role === 'Cashier') quickActions.push('<button class="quick-action" data-nav="reports"><span class="quick-action-icon">▥</span><span>Shift reports</span></button>');
  const activityPanel = isTechnician
    ? `<div class="panel activity-panel"><div class="panel-heading"><div><h2>Stock needing a closer look</h2><p>Products at or below their reorder threshold</p></div><button class="text-link" data-nav="inventory">View inventory →</button></div><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>ON HAND</th><th>REORDER AT</th><th>STATUS</th></tr></thead><tbody>${alerts.map((drug) => `<tr><td class="cell-primary">${escapeHtml(drug.name)}</td><td>${drug.onHand}</td><td>${drug.reorder}</td><td>${statusBadge('Low stock')}</td></tr>`).join('') || '<tr><td colspan="4"><div class="empty-state">No stock items need attention.</div></td></tr>'}</tbody></table></div></div>`
    : `<div class="panel activity-panel"><div class="panel-heading"><div><h2>Recent transactions</h2><p>Today · ${escapeHtml(activeCompanyName())}</p></div><button class="text-link" data-nav="${permissions[state.role].includes('pos') ? 'pos' : 'reports'}">${permissions[state.role].includes('pos') ? 'View all' : 'View reports'} →</button></div><div class="table-wrap"><table><thead><tr><th>INVOICE</th><th>PATIENT</th><th>TIME</th><th>ITEMS</th><th>PAYMENT</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>${recentSales.map((sale) => `<tr><td class="cell-primary">${escapeHtml(sale.id)}</td><td>${escapeHtml(sale.patient)}</td><td>${escapeHtml(sale.time)}</td><td>${sale.items} item${sale.items === 1 ? '' : 's'}</td><td>${escapeHtml(sale.payment)}</td><td class="cell-primary">${money(sale.total)}</td><td>${statusBadge(sale.status)}</td></tr>`).join('')}</tbody></table></div></div>`;
  const brandedMetrics = metrics.replace('today · Northside', `today · ${escapeHtml(activeCompanyName())}`);
  const brandedActivityPanel = activityPanel.replace('Today · Northside Pharmacy', `Today · ${escapeHtml(activeCompanyName())}`);
  const chartPanel = isTechnician
    ? `<div class="panel sales-panel"><div class="panel-heading"><div><h2>Stock summary</h2><p>Available units across active product lines</p></div><button class="text-link" data-nav="inventory">Inventory →</button></div><div class="panel-body"><div class="report-grid" style="grid-template-columns:1fr 1fr;margin:0"><div class="report-stat"><span>Units on hand</span><strong>${data.drugs.reduce((sum, drug) => sum + drug.onHand, 0)}</strong><small>Across ${data.drugs.length} products</small></div><div class="report-stat"><span>Below reorder point</span><strong>${lowStock().length}</strong><small>${data.purchaseOrders.filter((order) => order.status !== 'Sent').length} open order(s)</small></div></div></div></div>`
    : data.sales.length === 0
      ? `<div class="panel sales-panel"><div class="panel-heading"><div><h2>Sales overview</h2><p>${escapeHtml(activeCompanyName())}</p></div></div><div class="empty-state"><strong>No sales recorded yet</strong>Sales and inventory activity will appear here as this company uses the workspace.</div></div>`
      : `<div class="panel sales-panel"><div class="panel-heading"><div><h2>${state.role === 'Cashier' ? 'Shift sales' : 'Sales overview'}</h2><p>Daily revenue and prescription sales · ${escapeHtml(activeCompanyName())}</p></div></div><div class="panel-body"><div class="sales-chart"><div class="axis-labels"><span>${money(150000)}</span><span>${money(100000)}</span><span>${money(50000)}</span><span>${money(0)}</span></div><div class="chart-stage">${[['M',54],['T',68],['W',47],['T',78],['F',63],['S',88],['S',71],['M',42]].map(([day, height]) => `<div class="chart-column"><div class="bar-stack" style="--bar:${height}%"><i></i></div><span class="bar-label">${day}</span></div>`).join('')}</div></div><div class="chart-legend"><span><i class="legend-dot"></i>Prescription</span><span><i class="legend-dot alt"></i>OTC & other</span></div></div></div>`;
  const attentionPanel = state.role === 'Cashier' ? '' : `<div class="panel attention-panel"><div class="attention-banner"><span class="attention-symbol">!</span><span><strong>Needs your attention</strong><small>${lowStock().length} items need a restock plan</small></span></div><div class="alert-list">${alerts.length ? alerts.map((drug) => `<div class="alert-row"><span class="drug-pill">${escapeHtml(initialsFor(drug.generic))}</span><span class="alert-copy"><strong>${escapeHtml(drug.name)}</strong><small>${escapeHtml(drug.id)} · reorder at ${drug.reorder}</small></span><span class="alert-qty">${drug.onHand} left</span></div>`).join('') : '<div class="empty-state">Stock levels look healthy.</div>'}<button class="text-link" data-nav="inventory">Review inventory →</button></div></div>`;
  return `<div class="metric-grid">${brandedMetrics}</div>
  <div class="overview-grid">
    ${chartPanel}
    <div class="right-stack">
      ${attentionPanel}
      <div class="panel"><div class="panel-heading"><h2>Quick actions</h2></div><div class="quick-actions">${quickActions.join('')}</div></div>
    </div>
    ${activityPanel}
  </div>`;
}

function renderPos() {
  const cartItems = data.cart.map((line) => ({ ...line, drug: drugFor(line.drugId) })).filter((line) => line.drug);
  const summary = calculateSaleSummary(cartItems, state.posDiscountPercent, state.posDiscountFlat);
  return `<div class="pos-layout" style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,.8fr);gap:14px;align-items:start"><section class="panel"><div class="panel-heading"><div><h2>Choose products</h2><p>Search by name or generic</p></div><span class="status">${data.drugs.length} products</span></div><div class="panel-body"><label class="search-field" style="width:100%;margin-bottom:11px"><span>⌕</span><input id="pos-search" type="search" placeholder="Find a medication..."></label><div class="pos-products" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px">${data.drugs.filter((drug) => drug.onHand > 0).map((drug) => `<button class="quick-action pos-product" data-action="add-cart" data-id="${escapeHtml(drug.id)}" style="min-height:58px"><span class="medicine-mark">Rx</span><span style="min-width:0;flex:1;text-align:left"><strong style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px">${escapeHtml(drug.name)}</strong><small style="display:block;margin-top:4px;color:#87928a;font-size:8px">${drug.onHand} in stock</small></span><strong style="font-size:9px">${money(drug.price)}</strong></button>`).join('')}</div></div></section>
    <section class="panel"><div class="panel-heading"><div><h2>Current sale</h2><p>${cartItems.length} product${cartItems.length === 1 ? '' : 's'} in basket</p></div><span class="status">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span></div><div class="panel-body"><div class="form-field" style="margin-bottom:13px"><label for="pos-patient">Patient</label><select id="pos-patient"><option value="Walk-in customer">Walk-in customer</option>${data.patients.map((patient) => `<option value="${escapeHtml(patient.name)}">${escapeHtml(patient.name)} · ${escapeHtml(patient.id)}</option>`).join('')}</select></div>${cartItems.length ? cartItems.map((line) => `<div class="summary-line" style="align-items:center"><span style="flex:1"><strong>${escapeHtml(line.drug.name)}</strong><small class="cell-sub">${money(line.drug.price)} each</small></span><span class="table-actions"><button class="button button-small" data-action="cart-dec" data-id="${escapeHtml(line.drugId)}" aria-label="Decrease quantity">−</button><strong>${line.quantity}</strong><button class="button button-small" data-action="cart-inc" data-id="${escapeHtml(line.drugId)}" aria-label="Increase quantity">＋</button></span><strong style="min-width:54px;text-align:right">${money(line.drug.price * line.quantity)}</strong></div>`).join('') : `<div class="empty-state"><strong>Your basket is empty</strong>Select a product to start a sale.</div>`}<div style="margin-top:11px;padding-top:6px;border-top:1px solid #edf0ed"><div class="summary-line"><span>Subtotal</span><strong>${money(summary.subtotal)}</strong></div><div class="summary-line"><span>Discount</span><strong>− ${money(summary.discount)}</strong></div><div class="summary-line"><span>Tax (8.25%)</span><strong>${money(summary.tax)}</strong></div><div class="summary-line summary-total"><strong>Total due</strong><strong>${money(summary.total)}</strong></div></div><div class="form-field" style="margin-top:12px"><label for="pos-discount-percent">Discount %</label><input id="pos-discount-percent" type="number" min="0" max="100" step="0.5" value="${Number(state.posDiscountPercent).toString()}" /></div><div class="form-field" style="margin-top:8px"><label for="pos-discount-flat">Discount (₹)</label><input id="pos-discount-flat" type="number" min="0" step="0.5" value="${Number(state.posDiscountFlat).toString()}" /></div><div class="form-field" style="margin-top:12px"><label for="pos-payment">Payment method</label><select id="pos-payment"><option>Card</option><option>Cash</option><option>Insurance</option></select></div><button class="button button-primary" style="margin-top:12px;width:100%" data-action="checkout">Complete sale</button></div></section></div>`;
}

function renderInventory() {
  const rows = data.drugs.filter((drug) => `${drug.name} ${drug.generic} ${drug.category} ${drug.batch} ${drug.strength || ''} ${drug.specification || ''} ${drug.indication || ''}`.toLowerCase().includes(state.inventoryQuery.toLowerCase()));
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="inventory-search" type="search" placeholder="Search inventory..." value="${escapeHtml(state.inventoryQuery)}"></label><select id="inventory-filter" class="filter-select"><option>All stock</option><option>Low stock</option><option>In stock</option><option>No stock</option></select></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.drugs.length} products · ${lowStock().length} low stock</span></div></div>
  <div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>MEDICATION</th><th>CATEGORY</th><th>ON HAND</th><th>REORDER AT</th><th>BATCH / EXPIRY</th><th>UNIT PRICE</th><th>STATUS</th><th></th></tr></thead><tbody id="inventory-rows">${rows.map((drug) => {
    const isLowStock = drug.onHand <= drug.reorder;
    const hasDetails = Boolean(drug.specification || drug.indication);
    const hasStock = drug.onHand > 0;
    return `<tr data-search="${escapeHtml(`${drug.name} ${drug.generic} ${drug.category} ${drug.batch} ${drug.strength || ''} ${drug.specification || ''} ${drug.indication || ''}`.toLowerCase())}" data-stock="${hasStock ? isLowStock ? 'low' : 'in' : 'none'}"><td><span class="inventory-name"><span class="medicine-mark ${drug.category === 'Pain relief' ? 'capsule' : ''}">Rx</span><span class="cell-primary">${escapeHtml(drug.name)}<small class="cell-sub">${escapeHtml(drug.generic)} · ${escapeHtml(drug.id)}</small></span></span></td><td>${escapeHtml(drug.category)}</td><td><span class="stock-track"><i class="${isLowStock ? 'low-bar' : ''}" style="width:${Math.min(100, Math.round(drug.onHand / Math.max(drug.reorder * 2, 1) * 100))}%"></i></span><span class="cell-primary">${drug.onHand}</span></td><td>${drug.reorder} units</td><td>${escapeHtml(drug.batch || 'Not received')}<small class="cell-sub">${drug.expiry ? `Expires ${escapeHtml(drug.expiry)}` : 'Expiry pending receipt'}</small></td><td>${money(drug.price)}</td><td>${statusBadge(!hasStock ? 'No stock' : isLowStock ? 'Low stock' : 'In stock')}</td><td><span class="table-actions">${hasDetails ? `<button class="button button-small" data-action="drug-details" data-id="${escapeHtml(drug.id)}">Details</button>` : ''}${isLowStock && ['Admin', 'Pharmacist', 'Technician', 'Superadmin'].includes(state.role) ? `<button class="button button-small button-primary" data-action="order-low-stock" data-id="${escapeHtml(drug.id)}">Add to order</button>` : ''}${['Admin', 'Technician', 'Pharmacist', 'Superadmin'].includes(state.role) ? `<button class="button button-small" data-action="receive-one" data-id="${escapeHtml(drug.id)}">＋ Receive</button>` : ''}</span></td></tr>`;
  }).join('') || `<tr><td colspan="8"><div class="empty-state">No products match that search.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Showing ${rows.length} of ${data.drugs.length} products</span><span>Stock updated just now</span></div></div>`;
}

function renderPrescriptions() {
  const filtered = data.prescriptions.filter((prescription) =>
    state.prescriptionFilter === 'All prescriptions' || prescription.status === state.prescriptionFilter
  );
  const canReview = canPerformRole('Admin', 'Pharmacist');
  const rows = filtered.map((prescription) => {
    const reviewActions = canReview && prescription.status === 'Pending review'
      ? `<span class="table-actions"><button class="button button-small" data-action="approve-rx" data-id="${escapeHtml(prescription.id)}">Approve</button><button class="button button-small button-danger" data-action="reject-rx" data-id="${escapeHtml(prescription.id)}">Reject</button></span>`
      : canReview && prescription.status === 'Approved'
        ? `<button class="button button-small button-primary" data-action="dispense-rx" data-id="${escapeHtml(prescription.id)}">Mark dispensed</button>`
        : '—';
    return `<tr><td class="cell-primary">${escapeHtml(prescription.id)}</td><td><span class="cell-primary">${escapeHtml(prescription.patient)}</span><small class="cell-sub">${escapeHtml(prescription.patientId)}</small></td><td>${escapeHtml(prescription.doctor)}</td><td><span class="cell-primary">${escapeHtml(prescription.medication)}</span><small class="cell-sub">${escapeHtml(prescription.directions)}</small>${prescription.allergy ? `<small class="cell-sub" style="color:#b75a51">⚠ ${escapeHtml(prescription.allergy)}</small>` : ''}</td><td>${escapeHtml(prescription.received)}</td><td>${statusBadge(prescription.status)}</td><td>${reviewActions}</td></tr>`;
  }).join('');
  const filters = ['All prescriptions', 'Pending review', 'Approved', 'Dispensed', 'Rejected'];
  return `<div class="toolbar"><div class="toolbar-left"><select id="prescription-filter" class="filter-select">${filters.map((filter) => `<option ${state.prescriptionFilter === filter ? 'selected' : ''}>${filter}</option>`).join('')}</select><span style="color:#829087;font-size:9px">${pendingCount()} need review</span></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.prescriptions.length} prescriptions</span></div></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>RX NUMBER</th><th>PATIENT</th><th>PRESCRIBER</th><th>MEDICATION & DIRECTIONS</th><th>RECEIVED</th><th>STATUS</th><th>REVIEW</th></tr></thead><tbody>${rows || '<tr><td colspan="7"><div class="empty-state">No prescriptions in this view.</div></td></tr>'}</tbody></table></div><div class="table-foot"><span>${filtered.length} prescriptions · ${pendingCount()} awaiting review</span><span>Clinical review actions are recorded locally in this demo.</span></div></div>`;
}

function renderPurchaseOrders() {
  const filtered = data.purchaseOrders.filter((order) =>
    state.poFilter === 'All orders' || order.status === state.poFilter
  );
  const draftItems = data.purchaseOrders
    .filter((order) => order.status === 'Draft')
    .reduce((sum, order) => sum + order.items.length, 0);
  const canCreateOrders = canPerformRole('Admin', 'Pharmacist', 'Technician');
  const canManageOrders = canPerformRole('Admin');
  const cards = filtered.map((order) => {
    const actions = [
      canCreateOrders && order.status === 'Draft'
        ? `<button class="button button-small" data-action="add-po-item" data-id="${escapeHtml(order.id)}">＋ Add item</button>`
        : '',
      canManageOrders && ['Draft', 'Pending approval'].includes(order.status)
        ? `<button class="button button-small button-primary" data-action="finalize-po" data-id="${escapeHtml(order.id)}">${order.status === 'Draft' ? 'Review & send' : 'Approve & send'}</button>`
        : '',
      canManageOrders && order.status === 'Sent'
        ? `<button class="button button-small" data-action="email-po" data-id="${escapeHtml(order.id)}">Email supplier</button><button class="button button-small" data-action="print-po" data-id="${escapeHtml(order.id)}">Print / PDF</button>`
        : '',
      canManageOrders
        ? `<button class="button button-small" data-action="view-audit" data-id="${escapeHtml(order.id)}">Audit trail</button>`
        : ''
    ].join('');
    const total = order.items.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    return `<article class="po-card"><div class="po-card-top"><div><span class="po-number">${escapeHtml(order.id)} · CREATED ${escapeHtml(order.created.toUpperCase())}</span><h3>${escapeHtml(order.supplier || 'Supplier not assigned')}</h3><p>Created by ${escapeHtml(order.createdBy || 'Pharmacy team')}</p></div>${statusBadge(order.status)}</div><div class="po-meta"><span><strong>${order.items.length}</strong> line item${order.items.length === 1 ? '' : 's'}</span><span>Est. <strong>${money(total)}</strong></span></div><div class="po-card-actions">${actions}</div></article>`;
  }).join('');
  const filters = ['All orders', 'Draft', 'Pending approval', 'Sent'];
  const openOrders = data.purchaseOrders.filter((order) => ['Draft', 'Pending approval'].includes(order.status)).length;
  const sentOrders = data.purchaseOrders.filter((order) => order.status === 'Sent').length;
  return `<div class="toolbar"><div class="toolbar-left"><select id="po-filter" class="filter-select">${filters.map((filter) => `<option ${state.poFilter === filter ? 'selected' : ''}>${filter}</option>`).join('')}</select><span style="color:#829087;font-size:9px">${draftItems} line items in drafts</span></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.purchaseOrders.length} orders</span></div></div><div class="po-layout"><div class="panel"><div class="panel-heading"><div><h2>Order queue</h2><p>Requests from your pharmacy team</p></div></div>${cards || '<div class="empty-state"><strong>No orders here yet</strong>Restock requests will appear here.</div>'}</div><aside class="panel"><div class="panel-heading"><div><h2>Restock snapshot</h2><p>Based on current shelf levels</p></div></div><div class="panel-body"><div class="summary-line"><span>Below threshold</span><strong>${lowStock().length} products</strong></div><div class="summary-line"><span>Draft / awaiting review</span><strong>${openOrders} orders</strong></div><div class="summary-line"><span>Sent to supplier</span><strong>${sentOrders} orders</strong></div><div style="margin-top:12px"><button class="button" data-nav="inventory" style="width:100%">Check low stock</button></div></div></aside></div>`;
}

function renderPatients() {
  const patients = data.patients.filter((patient) => `${patient.name} ${patient.id} ${patient.phone}`.toLowerCase().includes(state.patientQuery.toLowerCase()));
  const rows = patients.map((patient, index) => `<tr data-search="${escapeHtml(`${patient.name} ${patient.id} ${patient.phone}`.toLowerCase())}"><td><span class="patient-cell"><span class="avatar ${index % 3 === 1 ? 'avatar-blue' : index % 3 === 2 ? 'avatar-orange' : 'avatar-green'}">${escapeHtml(patient.initials || initialsFor(patient.name))}</span><span class="cell-primary">${escapeHtml(patient.name)}</span></span></td><td class="cell-primary">${escapeHtml(patient.id)}</td><td>${escapeHtml(patient.age)}</td><td>${escapeHtml(patient.phone)}</td><td>${escapeHtml(patient.allergies)}</td><td>${escapeHtml(patient.lastVisit)}</td><td><button class="text-link" data-action="patient-history" data-id="${escapeHtml(patient.id)}">View history</button></td><td>${canPerformRole('Admin') ? `<button class="button button-small" data-action="edit-patient" data-id="${escapeHtml(patient.id)}">Edit</button>` : ''}</td></tr>`).join('');
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="patient-search" type="search" placeholder="Search patients..." value="${escapeHtml(state.patientQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.patients.length} patients</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>PATIENT</th><th>PATIENT ID</th><th>AGE</th><th>PHONE</th><th>ALLERGIES</th><th>LAST VISIT</th><th>RECORD</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="8"><div class="empty-state">No patients match that search.</div></td></tr>'}</tbody></table></div><div class="table-foot"><span>Showing ${patients.length} of ${data.patients.length} patients</span><span>Patient records are demo data.</span></div></div>`;
}

function renderDoctors() {
  const doctors = data.doctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.email}`.toLowerCase().includes(state.doctorQuery.toLowerCase()));
  const rows = doctors.map((doctor, index) => `<tr data-search="${escapeHtml(`${doctor.name} ${doctor.specialty} ${doctor.email}`.toLowerCase())}"><td><span class="patient-cell"><span class="avatar ${index % 2 ? 'avatar-blue' : 'avatar-green'}">${escapeHtml(initialsFor(doctor.name.replace(/^Dr\.\s*/, '')))}</span><span class="cell-primary">${escapeHtml(doctor.name)}<small class="cell-sub">${escapeHtml(doctor.id)}</small></span></span></td><td>${escapeHtml(doctor.specialty)}</td><td>${escapeHtml(doctor.phone)}</td><td>${escapeHtml(doctor.email)}</td><td>${doctor.referrals} this month</td><td>${statusBadge('Active')}</td><td><button class="button button-small" data-action="copy-referral-link" data-id="${escapeHtml(doctor.id)}">Copy link</button></td><td>${canPerformRole('Admin') ? `<button class="button button-small" data-action="edit-doctor" data-id="${escapeHtml(doctor.id)}">Edit</button>` : ''}</td></tr>`).join('');
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="doctor-search" type="search" placeholder="Search doctors..." value="${escapeHtml(state.doctorQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.doctors.length} clinicians</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>CLINICIAN</th><th>SPECIALTY</th><th>PHONE</th><th>EMAIL</th><th>REFERRALS</th><th>STATUS</th><th>REFERRAL LINK</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="8"><div class="empty-state">No doctors match that search.</div></td></tr>'}</tbody></table></div><div class="table-foot"><span>Showing ${doctors.length} of ${data.doctors.length} clinicians</span><span>Provider directory · ${escapeHtml(activeCompanyName())}</span></div></div>`;
}

function renderSuppliers() {
  const suppliers = data.suppliers.filter((supplier) => `${supplier.name} ${supplier.contact} ${supplier.email}`.toLowerCase().includes(state.supplierQuery.toLowerCase()));
  const rows = suppliers.map((supplier) => `<tr data-search="${escapeHtml(`${supplier.name} ${supplier.contact} ${supplier.email}`.toLowerCase())}"><td><span class="cell-primary">${escapeHtml(supplier.name)}</span><small class="cell-sub">${escapeHtml(supplier.id)}</small></td><td>${escapeHtml(supplier.contact)}</td><td>${escapeHtml(supplier.email)}</td><td>${escapeHtml(supplier.phone)}</td><td>${escapeHtml(supplier.terms)}</td><td>${statusBadge(supplier.active ? 'Active' : 'Inactive')}</td><td>${canPerformRole('Admin') && supplier.active ? `<button class="button button-small" data-action="edit-supplier" data-id="${escapeHtml(supplier.id)}">Edit</button> <button class="button button-small button-danger" data-action="deactivate-supplier" data-id="${escapeHtml(supplier.id)}">Deactivate</button>` : ''}</td></tr>`).join('');
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="supplier-search" type="search" placeholder="Search suppliers..." value="${escapeHtml(state.supplierQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.suppliers.filter((supplier) => supplier.active).length} active partners</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>SUPPLIER</th><th>CONTACT</th><th>EMAIL</th><th>PHONE</th><th>TERMS</th><th>STATUS</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="7"><div class="empty-state">No suppliers match that search.</div></td></tr>'}</tbody></table></div><div class="table-foot"><span>Supplier agency records · ${escapeHtml(activeCompanyName())}</span><span>Company administration</span></div></div>`;
}

function renderEmployees() {
  if (!isAdminRole()) return '<div class="empty-state">This section is only available to administrators.</div>';
  const employees = data.employees.filter((employee) => employee.active);
  const rows = employees.map((employee) => `<tr><td><span class="patient-cell"><span class="avatar avatar-green">${escapeHtml(initialsFor(employee.name))}</span><span class="cell-primary">${escapeHtml(employee.name)}<small class="cell-sub">${escapeHtml(employee.id)}</small></span></span></td><td>${escapeHtml(employee.email)}</td><td>${escapeHtml(employee.role)}</td><td>${statusBadge('Active')}</td><td>${employee.id === state.employeeId ? '<span class="cell-sub">Current account</span>' : `<button class="button button-small button-danger" data-action="remove-employee" data-id="${escapeHtml(employee.id)}">Remove</button>`}</td></tr>`).join('');
  return `<div class="panel table-panel"><div class="panel-heading"><div><h2>Employee accounts</h2><p>${employees.length} active accounts · ${escapeHtml(activeCompanyName())}</p></div><span class="status">Admin access</span></div><div class="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>EMAIL</th><th>ROLE</th><th>ACCOUNT</th><th></th></tr></thead><tbody>${rows}</tbody></table></div><div class="table-foot"><span>Demo credentials are stored in this browser only.</span><span>Accounts belong to this company profile.</span></div></div>`;
}

function renderCompanies() {
  if (state.role !== 'Superadmin') return '<div class="empty-state">This section is only available to Superadmin.</div>';
  const rows = data.companyProfiles.map((company) => {
    const companyData = company.id === data.activeCompanyId ? snapshotCompanyData(data) : company.companyData;
    const openOrders = companyData.purchaseOrders.filter((order) => order.status !== 'Sent').length;
    return `<tr><td class="cell-primary">${escapeHtml(company.name)}<small class="cell-sub">${escapeHtml(company.id)}</small></td><td>${companyData.employees.length}</td><td>${companyData.patients.length}</td><td>${companyData.drugs.length}</td><td>${openOrders}</td><td>${statusBadge(company.id === data.activeCompanyId ? 'Active profile' : 'Available')}</td><td><span class="table-actions">${company.id !== data.activeCompanyId ? `<button class="button button-small button-primary" data-action="switch-company" data-id="${escapeHtml(company.id)}">Switch</button>` : ''}<button class="button button-small" data-action="rename-company" data-id="${escapeHtml(company.id)}">Rename</button></span></td></tr>`;
  }).join('');
  return `<div class="panel table-panel"><div class="panel-heading"><div><h2>Company profiles</h2><p>Each profile has separate employees, patients, doctors, inventory, purchase orders, and sales.</p></div><span class="status">${data.companyProfiles.length} profiles</span></div><div class="table-wrap"><table><thead><tr><th>COMPANY</th><th>EMPLOYEES</th><th>PATIENTS</th><th>PRODUCTS</th><th>OPEN ORDERS</th><th>STATUS</th><th></th></tr></thead><tbody>${rows}</tbody></table></div><div class="table-foot"><span>Profile changes do not move records between companies.</span><span>Company and account management is local to this demo.</span></div></div>`;
}

function openCompanyModal(company = null) {
  if (company) {
    openModal('Rename company profile', field('Company name', 'name', 'text', company.name), 'Save name', 'rename-company-submit', company.id);
    return;
  }
  const fields = `${field('Company name', 'companyName')}${field('First Admin name', 'adminName')}${field('First Admin email', 'adminEmail', 'email')}${field('Temporary password', 'adminPassword', 'password')}`;
  openModal('Create company profile', fields, 'Create profile', 'create-company');
  $('#field-adminPassword').minLength = 6;
}

function openEmployeeModal() {
  const roleOptions = ['Admin', 'Pharmacist', 'Technician', 'Cashier'].map((role) => `<option value="${role}">${role}</option>`).join('');
  openModal('Add employee', `${field('Full name', 'name')}${field('Email address', 'email', 'email')}${field('Temporary password', 'password', 'password')}${field('Role', 'role', 'select', '', true, roleOptions)}`, 'Add employee', 'create-employee');
  $('#field-password').minLength = 6;
}

function openPatientModal(patient = null) {
  const isEdit = Boolean(patient);
  const fields = `${field('Full name', 'name', 'text', patient?.name || '')}${field('Age', 'age', 'number', patient?.age ?? '30')}${field('Phone', 'phone', 'tel', patient?.phone || '')}${field('Allergies', 'allergies', 'text', patient?.allergies || 'None recorded', false)}${isEdit ? `<div class="form-field full"><label>Patient ID</label><div class="summary-line"><strong>${escapeHtml(patient.id)}</strong></div></div>` : '<div class="form-field full"><p class="reference-intro">A unique patient ID will be assigned when this record is saved.</p></div>'}`;
  openModal(isEdit ? `Edit ${patient.name}` : 'Add patient', fields, isEdit ? 'Save changes' : 'Add patient', isEdit ? 'edit-patient-submit' : 'create-patient', patient?.id || '');
}

function openDoctorModal(doctor = null) {
  const isEdit = Boolean(doctor);
  const fields = `${field('Full name', 'name', 'text', doctor?.name || '')}${field('Specialty', 'specialty', 'text', doctor?.specialty || '')}${field('Phone', 'phone', 'tel', doctor?.phone || '')}${field('Email', 'email', 'email', doctor?.email || '')}`;
  openModal(isEdit ? `Edit ${doctor.name}` : 'Add doctor', fields, isEdit ? 'Save changes' : 'Add doctor', isEdit ? 'edit-doctor-submit' : 'create-doctor', doctor?.id || '');
}

function renderReports() {
  if (state.role === 'Technician') {
    const units = data.drugs.reduce((sum, drug) => sum + drug.onHand, 0);
    return `<div class="report-grid">${[['Products tracked', data.drugs.length], ['Units on hand', units], ['Below reorder point', lowStock().length]].map(([label, value]) => `<div class="report-stat"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div><section class="panel"><div class="panel-heading"><div><h2>Stock watch</h2><p>Products at or below their reorder threshold</p></div><button class="text-link" data-nav="inventory">Open inventory →</button></div><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>ON HAND</th><th>REORDER AT</th><th>BATCH</th><th>STATUS</th></tr></thead><tbody>${lowStock().map((drug) => `<tr><td class="cell-primary">${escapeHtml(drug.name)}</td><td>${drug.onHand}</td><td>${drug.reorder}</td><td>${escapeHtml(drug.batch || 'Not received')}</td><td>${statusBadge('Low stock')}</td></tr>`).join('') || '<tr><td colspan="5"><div class="empty-state">No products below their reorder point.</div></td></tr>'}</tbody></table></div></section>`;
  }
  const sales = state.role === 'Cashier' ? data.sales.filter((sale) => sale.employeeId === state.employeeId) : data.sales;
  const salesTotal = sales.reduce((sum, sale) => sum + sale.total, 0);
  const inventoryValue = data.drugs.reduce((sum, drug) => sum + drug.onHand * drug.price, 0);
  const stats = [['Sales recorded', money(salesTotal)], ['Transactions', sales.length], ['Inventory value', money(inventoryValue)]];
  const rows = sales.slice(0, 10).map((sale) => `<tr><td class="cell-primary">${escapeHtml(sale.id)}</td><td>${escapeHtml(sale.patient)}</td><td>${escapeHtml(sale.time)}</td><td>${sale.items}</td><td>${escapeHtml(sale.payment)}</td><td>${money(sale.total)}</td></tr>`).join('');
  return `<div class="report-grid">${stats.map(([label, value]) => `<div class="report-stat"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div><section class="panel activity-panel"><div class="panel-heading"><div><h2>${state.role === 'Cashier' ? 'Shift transactions' : 'Recent transactions'}</h2><p>${escapeHtml(activeCompanyName())}</p></div></div><div class="table-wrap"><table><thead><tr><th>INVOICE</th><th>CUSTOMER</th><th>TIME</th><th>ITEMS</th><th>PAYMENT</th><th>TOTAL</th></tr></thead><tbody>${rows || '<tr><td colspan="6"><div class="empty-state">No transactions recorded yet.</div></td></tr>'}</tbody></table></div></section>`;
}

function openModal(title, fields, submitLabel, action, id = '') {
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="dismiss-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-heading"><h2 id="modal-title">${escapeHtml(title)}</h2><button class="modal-close" type="button" data-action="dismiss-modal" aria-label="Close">×</button></div><form id="modal-form" class="modal-form" data-submit-action="${escapeHtml(action)}" data-record-id="${escapeHtml(id)}"><div class="form-grid">${fields}</div><div class="modal-actions"><button class="button" type="button" data-action="dismiss-modal">Cancel</button><button class="button button-primary" type="submit">${escapeHtml(submitLabel)}</button></div></form></section></div>`;
  $('#modal-root input, #modal-root select')?.focus();
}

function openDrugDetails(drug) {
  const detail = (label, value) => `<div class="form-field full"><label>${label}</label><div class="summary-line"><span>${escapeHtml(value || 'Not listed in the supplied references.')}</span></div></div>`;
  const fields = `${detail('Strength', drug.strength)}${detail('Detailed specification', drug.specification)}${detail('Indication', drug.indication)}${detail('Unit size', drug.unitSize)}${detail('Pack size', drug.packSize)}${detail('Reference', drug.referenceSource)}`;
  openModal(`${drug.name} · product details`, fields, 'Close', 'view-only', drug.id);
}

function renderDrugReferenceResults(query) {
  const resultsElement = $('#reference-results');
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length < 2) {
    resultsElement.innerHTML = '<p class="reference-empty">Enter at least two characters to search the medicine references.</p>';
    return;
  }
  const matches = DRUG_REFERENCE.map((entry, index) => ({ entry, index })).filter(({ entry }) =>
    `${entry.name} ${entry.genericName || ''} ${entry.strength || ''} ${entry.specification || ''} ${entry.indication || ''} ${entry.unitSize || ''} ${entry.packSize || ''}`.toLowerCase().includes(normalizedQuery)
  );
  const results = matches.slice(0, 30).map(({ entry, index }) => {
    const alreadyAdded = data.drugs.some((drug) => drug.name.trim().toLowerCase() === entry.name.trim().toLowerCase());
    const description = ['strength', 'specification', 'indication'].filter((key) => entry[key]).map((key) => `<p><strong>${key[0].toUpperCase()}${key.slice(1)}:</strong> ${escapeHtml(entry[key])}</p>`).join('');
    return `<article class="reference-result"><div class="reference-result-heading"><strong>${escapeHtml(entry.name)}</strong><span class="reference-source">${entry.type === 'approval' ? 'Approval reference' : 'Tender reference'}</span></div>${description}<div class="reference-result-footer"><small>${escapeHtml(entry.source)}</small><button class="button button-small button-primary" data-action="add-reference-product" data-id="${index}" ${alreadyAdded ? 'disabled' : ''}>${alreadyAdded ? 'Already in inventory' : 'Add to inventory'}</button></div></article>`;
  }).join('');
  resultsElement.innerHTML = results ? `${results}${matches.length > 30 ? `<p class="reference-empty">Showing 30 of ${matches.length} matches. Refine your search.</p>` : ''}` : '<p class="reference-empty">No reference entries match that search.</p>';
}

function openDrugReferenceModal() {
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="dismiss-modal"><section class="modal reference-modal" role="dialog" aria-modal="true" aria-labelledby="reference-modal-title"><div class="modal-heading"><h2 id="reference-modal-title">Drug reference</h2><button class="modal-close" type="button" data-action="dismiss-modal" aria-label="Close">×</button></div><div class="modal-form"><p class="reference-intro">${DRUG_REFERENCE.length.toLocaleString()} source entries. Reference records do not include your stock or retail price.</p><label class="search-field reference-search"><span>⌕</span><input id="reference-search" type="search" placeholder="Search name, strength, specification, or indication" autocomplete="off"></label><div id="reference-results" class="reference-results" aria-live="polite"></div></div></section></div>`;
  renderDrugReferenceResults('');
  $('#reference-search')?.focus();
}

function openReferenceProductModal(reference, referenceIndex) {
  const details = [reference.specification, reference.indication, reference.unitSize && `Unit size: ${reference.unitSize}`, reference.packSize && `Pack size: ${reference.packSize}`, reference.packingType && `Packing type: ${reference.packingType}`, reference.packingStandard && `Packing standard: ${reference.packingStandard}`].filter(Boolean).map(escapeHtml).join('<br>');
  const fields = `${field('Product name / brand', 'name', 'text', reference.name)}${field('Medicine / generic name', 'generic', 'text', reference.genericName || reference.name)}${field('Strength', 'strength', 'text', reference.strength || '', false)}${field('Inventory category', 'category')}${field('Retail price per unit (INR)', 'price', 'number')}${field('Reorder threshold (units)', 'reorder', 'number')}<div class="form-field full"><label>Reference details</label><div class="reference-detail-copy">${details || 'No additional specification was listed.'}<small>${escapeHtml(reference.source)}</small></div></div><div class="form-field full"><p class="reference-intro">This creates a zero-stock item. Enter its actual unit price and reorder threshold; receive stock with batch and expiry details separately.</p></div>`;
  openModal('Add reference product', fields, 'Add to inventory', 'create-reference-drug', String(referenceIndex));
}

function field(label, name, type = 'text', value = '', required = true, options = '') {
  const id = `field-${name}`;
  const input = type === 'select'
    ? `<select id="${id}" name="${name}" ${required ? 'required' : ''}>${options}</select>`
    : `<input id="${id}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''}>`;
  return `<div class="form-field"><label for="${id}">${label}</label>${input}</div>`;
}

function openSupplierModal(supplier = null) {
  const isEdit = Boolean(supplier);
  const fields = `${field('Agency name', 'name', 'text', supplier?.name || '')}${field('Contact name', 'contact', 'text', supplier?.contact || '')}${field('Email', 'email', 'email', supplier?.email || '')}${field('Phone', 'phone', 'tel', supplier?.phone || '')}${field('Payment terms', 'terms', 'text', supplier?.terms || 'Net 30')}`;
  openModal(isEdit ? 'Edit supplier' : 'Add supplier', fields, isEdit ? 'Save changes' : 'Add supplier', isEdit ? 'save-supplier' : 'create-supplier', supplier?.id || '');
}

function openPoModal(selectedDrug = null) {
  const suppliers = data.suppliers.filter((supplier) => supplier.active);
  const supplierField = canPerformRole('Admin')
    ? field('Supplier', 'supplier', 'select', '', false, `<option value="">Not assigned yet</option>${suppliers.map((supplier) => `<option value="${escapeHtml(supplier.name)}">${escapeHtml(supplier.name)}</option>`).join('')}`)
    : '';
  const quantity = selectedDrug ? Math.max(1, selectedDrug.reorder - selectedDrug.onHand) : 24;
  const productOptions = data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}" ${drug.id === selectedDrug?.id ? 'selected' : ''}>${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join('');
  openModal(selectedDrug ? `Restock ${selectedDrug.name}` : 'New purchase order', `${supplierField}${field('Add product', 'drugId', 'select', '', true, productOptions)}${field('Quantity', 'quantity', 'number', String(quantity))}`, 'Create draft', 'create-po');
}

function openPoItemModal(order) {
  const products = data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}">${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join('');
  openModal(`Add to ${order.id}`, `${field('Product', 'drugId', 'select', '', true, products)}${field('Quantity', 'quantity', 'number', '24')}`, 'Add item', 'add-po-item-submit', order.id);
}

function recordPoAudit(order, action, actor = data.employees.find((employee) => employee.id === state.employeeId)?.name || state.role) {
  order.audit ||= [];
  order.audit.push({ action, actor, at: new Date().toISOString() });
}

function signIn(employee) {
  state.employeeId = employee.id;
  state.role = employee.role;
  state.view = 'overview';
  $('#login-error').hidden = true;
  $('#login-screen').hidden = true;
  $('#app-shell').hidden = false;
  render();
}

function renderLoginAccounts() {
  const avatars = { Superadmin: 'avatar-orange', Admin: 'avatar-green', Pharmacist: 'avatar-blue', Technician: 'avatar-orange', Cashier: 'avatar-lime' };
  const accounts = [...data.superadmins, ...data.employees].filter((employee) => employee.active);
  $('#login-company-name').textContent = activeCompanyName().toUpperCase();
  $('#login-hint').textContent = `${activeCompanyName()} staff access.`;
  $('#demo-account-list').innerHTML = accounts.map((employee) => `<button class="demo-account" type="button" data-demo-email="${escapeHtml(employee.email)}" data-demo-password="${escapeHtml(employee.password)}"><span class="avatar ${avatars[employee.role] || 'avatar-green'}">${escapeHtml(initialsFor(employee.name))}</span><span class="demo-account-copy"><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.role)} · ${escapeHtml(employee.email)}</small></span><span class="demo-account-use">Use account →</span></button>`).join('');
}

function signOut() {
  state.employeeId = null;
  state.view = 'overview';
  state.role = 'Admin';
  $('#app-shell').hidden = true;
  $('#login-screen').hidden = false;
  $('#login-form').reset();
  $('#login-error').hidden = true;
  renderLoginAccounts();
  $('#login-email').focus();
}

function handleAction(action, id, element) {
  const role = state.role;
  if (action === 'logout') {
    signOut();
  } else if (action === 'add-employee' && canPerformRole('Admin')) {
    openEmployeeModal();
  } else if (action === 'add-company' && role === 'Superadmin') {
    openCompanyModal();
  } else if (action === 'rename-company' && role === 'Superadmin') {
    const company = data.companyProfiles.find((item) => item.id === id);
    if (company) openCompanyModal(company);
  } else if (action === 'switch-company' && role === 'Superadmin') {
    switchCompanyProfile(id);
  } else if (action === 'remove-employee' && canPerformRole('Admin')) {
    const employee = data.employees.find((item) => item.id === id);
    const activeAdmins = data.employees.filter((item) => item.active && item.role === 'Admin');
    if (!employee) return;
    if (employee.id === state.employeeId) return notify('Sign in with another Admin account before removing this account.');
    if (employee.role === 'Admin' && activeAdmins.length < 2) return notify('Keep at least one active Admin account.');
    if (confirm(`Remove ${employee.name}'s sign-in account?`)) {
      data.employees = data.employees.filter((item) => item.id !== id);
      save(); render(); notify('Employee account removed.');
    }
  } else if (action === 'dismiss-modal') {
    if (element.classList.contains('modal-backdrop') && element !== element.parentElement) return;
    $('#modal-root').innerHTML = '';
  } else if (action === 'receive-stock') {
    const products = data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}">${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join('');
    openModal('Receive stock', `${field('Product', 'drugId', 'select', '', true, products)}${field('Quantity received', 'quantity', 'number', '24')}${field('Batch number', 'batch', 'text', '')}${field('Expiry date', 'expiry', 'date', '')}`, 'Update inventory', 'receive-stock-submit');
  } else if (action === 'receive-one') {
    const drug = drugFor(id);
    if (!drug) return;
    openModal(`Receive ${drug.name}`, `${field('Quantity received', 'quantity', 'number', '24')}${field('Batch number', 'batch', 'text', drug.batch || '')}${field('Expiry date', 'expiry', 'date', '')}`, 'Update inventory', 'receive-one-submit', id);
  } else if (action === 'add-patient' && canPerformRole('Admin', 'Pharmacist', 'Technician')) {
    openPatientModal();
  } else if (action === 'edit-patient' && canPerformRole('Admin')) {
    const patient = data.patients.find((item) => item.id === id);
    if (patient) openPatientModal(patient);
  } else if (action === 'add-doctor' && canPerformRole('Admin', 'Pharmacist')) {
    openDoctorModal();
  } else if (action === 'edit-doctor' && canPerformRole('Admin')) {
    const doctor = data.doctors.find((item) => item.id === id);
    if (doctor) openDoctorModal(doctor);
  } else if (action === 'add-supplier' && canPerformRole('Admin')) {
    openSupplierModal();
  } else if (action === 'edit-supplier' && canPerformRole('Admin')) {
    openSupplierModal(data.suppliers.find((supplier) => supplier.id === id));
  } else if (action === 'deactivate-supplier' && canPerformRole('Admin')) {
    const supplier = data.suppliers.find((item) => item.id === id);
    if (supplier && confirm(`Deactivate ${supplier.name}? Existing purchase orders will remain unchanged.`)) {
      supplier.active = false;
      save(); render(); notify('Supplier deactivated.');
    }
  } else if (action === 'new-po' && canPerformRole('Admin', 'Pharmacist', 'Technician')) {
    openPoModal();
  } else if (action === 'order-low-stock' && canPerformRole('Admin', 'Pharmacist', 'Technician')) {
    const drug = drugFor(id);
    if (drug && drug.onHand <= drug.reorder) openPoModal(drug);
  } else if (action === 'add-po-item') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (order?.status === 'Draft' && canPerformRole('Admin', 'Pharmacist', 'Technician')) openPoItemModal(order);
  } else if (action === 'finalize-po' && canPerformRole('Admin')) {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    const suppliers = data.suppliers.filter((supplier) => supplier.active).map((supplier) => `<option value="${escapeHtml(supplier.name)}" ${supplier.name === order.supplier ? 'selected' : ''}>${escapeHtml(supplier.name)}</option>`).join('');
    const summary = `<div class="form-field full"><label>Order summary</label><div class="summary-line"><span>${order.items.length} products · ${order.items.reduce((sum, item) => sum + item.quantity, 0)} units</span><strong>${money(order.items.reduce((sum, item) => sum + item.quantity * item.cost, 0))}</strong></div></div>`;
    openModal(`${order.status === 'Draft' ? 'Review' : 'Approve'} ${order.id}`, `${field('Supplier', 'supplier', 'select', order.supplier, true, `<option value="">Choose supplier</option>${suppliers}`)}${summary}`, 'Approve & send', 'send-po', id);
  } else if (action === 'view-audit' && canPerformRole('Admin')) {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    const audit = order.audit?.length ? order.audit : [{ action: `Created order ${order.id}`, actor: order.createdBy || 'Pharmacy team', at: new Date(order.created).toISOString() }];
    const entries = audit.slice().reverse().map((entry) => `<div class="summary-line"><span><strong>${escapeHtml(entry.action)}</strong><small class="cell-sub">${escapeHtml(entry.actor)}</small></span><time>${escapeHtml(new Date(entry.at).toLocaleString())}</time></div>`).join('');
    openModal(`${order.id} · audit trail`, `<div class="form-field full">${entries}</div>`, 'Close', 'view-only');
  } else if (action === 'email-po' && canPerformRole('Admin')) {
    const order = data.purchaseOrders.find((item) => item.id === id);
    const supplier = data.suppliers.find((item) => item.name === order?.supplier);
    if (!order || !supplier) return notify('Assign an active supplier before emailing this order.');
    const lines = order.items.map((item) => `${item.name} — ${item.quantity} units`).join('\n');
    const total = order.items.reduce((sum, item) => sum + item.quantity * item.cost, 0);
    const body = `Hello ${supplier.contact},\n\nPlease find our order ${order.id}:\n${lines}\n\nEstimated total: ${money(total)}\n\nThank you,\n${activeCompanyName()}`;
    window.location.href = `mailto:${encodeURIComponent(supplier.email)}?subject=${encodeURIComponent(`Purchase order ${order.id}`)}&body=${encodeURIComponent(body)}`;
    notify('Your email app will open with the order details.');
  } else if (action === 'print-po' && canPerformRole('Admin')) {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    state.printOrder = id;
    const items = order.items.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${item.quantity}</td><td>${money(item.cost)}</td><td>${money(item.quantity * item.cost)}</td></tr>`).join('');
    const total = order.items.reduce((sum, item) => sum + item.quantity * item.cost, 0);
    $('#content').innerHTML = `<div class="panel"><div class="panel-heading"><h2>Purchase order ${escapeHtml(order.id)}</h2><button class="button" data-action="print-now">Print / save PDF</button></div><div class="panel-body"><p>Supplier: <strong>${escapeHtml(order.supplier)}</strong></p><p>Created: ${escapeHtml(order.created)} · Created by ${escapeHtml(order.createdBy || 'Pharmacy team')}</p><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>QUANTITY</th><th>UNIT COST</th><th>LINE TOTAL</th></tr></thead><tbody>${items}</tbody></table></div><div class="summary-line summary-total"><strong>Estimated total</strong><strong>${money(total)}</strong></div></div></div>`;
  } else if (action === 'print-now') {
    window.print();
  } else if (action === 'add-cart') {
    if (!canPerformRole('Admin', 'Cashier', 'Pharmacist')) return notify('Your role cannot process a sale.');
    const drug = drugFor(id);
    if (!drug || drug.onHand < 1) return notify('This product is out of stock.');
    const line = data.cart.find((item) => item.drugId === id);
    if (line && line.quantity >= drug.onHand) return notify('There is not enough stock for that quantity.');
    if (line) line.quantity += 1;
    else data.cart.push({ drugId: id, quantity: 1 });
    render();
  } else if (action === 'cart-inc' || action === 'cart-dec') {
    const line = data.cart.find((item) => item.drugId === id);
    const drug = drugFor(id);
    if (line && action === 'cart-inc' && line.quantity < drug.onHand) line.quantity += 1;
    else if (line && action === 'cart-inc') notify('There is not enough stock for that quantity.');
    else if (line && action === 'cart-dec') line.quantity -= 1;
    data.cart = data.cart.filter((item) => item.quantity > 0);
    render();
  } else if (action === 'clear-cart') {
    state.posDiscountPercent = 0;
    state.posDiscountFlat = 0;
    data.cart = [];
    render();
  } else if (action === 'checkout') {
    if (!data.cart.length) return;
    if (!canPerformRole('Admin', 'Cashier', 'Pharmacist')) return notify('Your role cannot process a sale.');
    const invalid = data.cart.find((line) => !drugFor(line.drugId) || drugFor(line.drugId).onHand < line.quantity);
    if (invalid) return notify('Stock changed. Review the basket and try again.');
    const cartItems = data.cart.map((line) => ({ ...line, drug: drugFor(line.drugId) }));
    const summary = calculateSaleSummary(cartItems, state.posDiscountPercent, state.posDiscountFlat);
    data.cart.forEach((line) => { drugFor(line.drugId).onHand -= line.quantity; });
    const sale = { id: `INV-${8292 + data.sales.length - 4}`, patient: $('#pos-patient')?.value || 'Walk-in customer', time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), items: data.cart.reduce((sum, line) => sum + line.quantity, 0), total: summary.total, payment: $('#pos-payment')?.value || 'Card', status: 'Paid', employeeId: state.employeeId, discount: summary.discount };
    data.sales.unshift(sale);
    state.posDiscountPercent = 0;
    state.posDiscountFlat = 0;
    data.cart = [];
    save(); render(); notify(`Sale ${sale.id} complete. Inventory updated.`);
  } else if (action === 'approve-rx' && canPerformRole('Admin', 'Pharmacist')) {
    const prescription = data.prescriptions.find((item) => item.id === id);
    if (!prescription || prescription.status !== 'Pending review') return;
    if (prescription.allergy && !confirm(`${prescription.allergy}. Confirm this prescription has been clinically checked and approve?`)) return;
    prescription.status = 'Approved'; save(); render(); notify(`${prescription.id} approved for dispensing.`);
  } else if (action === 'reject-rx' && canPerformRole('Admin', 'Pharmacist')) {
    const prescription = data.prescriptions.find((item) => item.id === id);
    if (!prescription || prescription.status !== 'Pending review') return;
    prescription.status = 'Rejected'; save(); render(); notify(`${prescription.id} rejected.`);
  } else if (action === 'dispense-rx' && canPerformRole('Admin', 'Pharmacist')) {
    const prescription = data.prescriptions.find((item) => item.id === id);
    if (!prescription || prescription.status !== 'Approved') return;
    prescription.status = 'Dispensed'; save(); render(); notify(`${prescription.id} marked as dispensed.`);
  } else if (action === 'patient-history') {
    const patient = data.patients.find((item) => item.id === id);
    if (!patient) return;
    const history = data.prescriptions.filter((prescription) => prescription.patientId === id);
    const rows = history.map((prescription) => `<div class="summary-line"><span><strong>${escapeHtml(prescription.medication)}</strong><small class="cell-sub">${escapeHtml(prescription.doctor)} · ${escapeHtml(prescription.received)}</small></span>${statusBadge(prescription.status)}</div>`).join('');
    openModal(`${patient.name} · visit history`, `<div class="form-field full"><label>Known allergies</label><div class="summary-line"><span>${escapeHtml(patient.allergies || 'None recorded')}</span></div></div><div class="form-field full"><label>Prescription history</label>${rows || '<p class="visit-note">No prescription history recorded.</p>'}</div>`, 'Close', 'view-only');
  } else if (action === 'copy-referral-link') {
    const doctor = doctorFor(id);
    if (!doctor) return;
    copyTextToClipboard(doctorReferralLink(doctor)).then(() => notify(`Referral link copied for ${doctor.name}.`)).catch(() => notify('Clipboard access is unavailable in this browser.'));
  } else if (action === 'drug-details') {
    const drug = drugFor(id);
    if (drug) openDrugDetails(drug);
  } else if (action === 'browse-reference' && canPerformRole('Admin', 'Pharmacist')) {
    openDrugReferenceModal();
  } else if (action === 'add-reference-product' && canPerformRole('Admin', 'Pharmacist')) {
    const reference = DRUG_REFERENCE[Number(id)];
    if (reference) openReferenceProductModal(reference, Number(id));
  } else if (action === 'sync-indian-catalog' && canPerformRole('Admin', 'Pharmacist')) {
    refreshIndianDrugCatalog(element);
  }
}

function handleFormSubmit(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const action = form.dataset.submitAction;
  const id = form.dataset.recordId;
  if (action === 'create-employee' && canPerformRole('Admin')) {
    const email = values.email.trim().toLowerCase();
    const employeeEmails = data.companyProfiles.flatMap((company) => (company.companyData?.employees || []).map((employee) => employee.email.toLowerCase()));
    if (employeeEmails.includes(email) || data.superadmins.some((account) => account.email.toLowerCase() === email)) return notify('An account already uses that email address.');
    if (values.password.length < 6) return notify('Use a temporary password with at least 6 characters.');
    data.employees.unshift({ id: `EMP-${Date.now()}`, name: values.name.trim(), email, password: values.password, role: values.role, active: true });
    state.view = 'employees';
  } else if (action === 'create-patient') {
    const name = values.name.trim();
    const age = Number(values.age);
    if (!name || !Number.isInteger(age) || age < 0 || !values.phone.trim()) return notify('Enter a patient name, valid age, and phone number.');
    data.patients.unshift({ id: nextRecordId(data.patients, 'PT'), ...values, name, age, phone: values.phone.trim(), allergies: values.allergies.trim() || 'None recorded', lastVisit: 'No visits yet', initials: initialsFor(name) });
    state.view = 'patients';
  } else if (action === 'create-doctor') {
    const name = values.name.trim();
    if (!name || !values.specialty.trim() || !values.phone.trim() || !values.email.trim()) return notify('Enter a doctor name, specialty, phone, and email.');
    data.doctors.unshift({ id: nextRecordId(data.doctors, 'DR'), ...values, name, specialty: values.specialty.trim(), phone: values.phone.trim(), email: values.email.trim().toLowerCase(), referrals: 0 });
    state.view = 'doctors';
  } else if (action === 'create-company' && state.role === 'Superadmin') {
    const name = values.companyName.trim();
    const adminName = values.adminName.trim();
    const adminEmail = values.adminEmail.trim().toLowerCase();
    if (!name || !adminName || !adminEmail || values.adminPassword.length < 6) return notify('Enter a company name, first Admin, email, and password of at least 6 characters.');
    if (data.companyProfiles.some((company) => company.name.trim().toLowerCase() === name.toLowerCase())) return notify('A company profile already uses that name.');
    const emailExists = data.superadmins.some((account) => account.email.toLowerCase() === adminEmail)
      || data.companyProfiles.some((company) => (company.companyData?.employees || []).some((employee) => employee.email.toLowerCase() === adminEmail));
    if (emailExists) return notify('An account already uses that email address.');
    const admin = { id: `EMP-${Date.now()}`, name: adminName, email: adminEmail, password: values.adminPassword, role: 'Admin', active: true };
    const company = { id: `CO-${Date.now()}`, name, companyData: createEmptyCompanyData(admin) };
    data.companyProfiles.push(company);
    data.activeCompanyId = company.id;
    Object.assign(data, structuredClone(company.companyData));
    state.view = 'overview';
  } else if (action === 'rename-company-submit' && state.role === 'Superadmin') {
    const company = data.companyProfiles.find((item) => item.id === id);
    const name = values.name.trim();
    if (!company || !name) return notify('Enter a company name.');
    if (data.companyProfiles.some((item) => item.id !== id && item.name.trim().toLowerCase() === name.toLowerCase())) return notify('A company profile already uses that name.');
    company.name = name;
    state.view = 'companies';
  } else if (action === 'edit-patient-submit' && canPerformRole('Admin')) {
    const patient = data.patients.find((item) => item.id === id);
    const name = values.name.trim();
    const age = Number(values.age);
    if (!patient || !name || !Number.isInteger(age) || age < 0 || !values.phone.trim()) return notify('Enter a patient name, valid age, and phone number.');
    Object.assign(patient, { name, age, phone: values.phone.trim(), allergies: values.allergies.trim() || 'None recorded', initials: initialsFor(name) });
    state.view = 'patients';
  } else if (action === 'edit-doctor-submit' && canPerformRole('Admin')) {
    const doctor = data.doctors.find((item) => item.id === id);
    const name = values.name.trim();
    if (!doctor || !name || !values.specialty.trim() || !values.phone.trim() || !values.email.trim()) return notify('Enter a doctor name, specialty, phone, and email.');
    Object.assign(doctor, { name, specialty: values.specialty.trim(), phone: values.phone.trim(), email: values.email.trim().toLowerCase() });
    state.view = 'doctors';
  } else if (action === 'create-supplier' || action === 'save-supplier') {
    if (!canPerformRole('Admin')) return;
    if (action === 'save-supplier') Object.assign(data.suppliers.find((supplier) => supplier.id === id), values);
    else data.suppliers.unshift({ id: `SU-${String(22 + data.suppliers.length).padStart(3, '0')}`, ...values, active: true });
    state.view = 'suppliers';
  } else if (action === 'create-reference-drug' && canPerformRole('Admin', 'Pharmacist')) {
    const reference = DRUG_REFERENCE[Number(id)];
    const name = values.name.trim();
    const generic = values.generic.trim();
    const category = values.category.trim();
    const price = Number(values.price);
    const reorder = Number(values.reorder);
    if (!reference || !name || !generic || !category || !Number.isFinite(price) || price <= 0 || values.reorder === '' || !Number.isInteger(reorder) || reorder < 0) return notify('Enter the product name, generic name, category, valid INR price, and reorder threshold.');
    if (data.drugs.some((drug) => drug.name.trim().toLowerCase() === name.toLowerCase())) return notify('A product with that name is already in inventory.');
    const nextId = data.drugs.reduce((largest, drug) => Math.max(largest, Number(drug.id.match(/^RX-(\d+)$/)?.[1]) || 0), 0) + 1;
    data.drugs.unshift({ id: `RX-${String(nextId).padStart(3, '0')}`, name, generic, category, strength: values.strength.trim(), specification: reference.specification || '', indication: reference.indication || '', referenceSource: reference.source, unitSize: reference.unitSize || '', packSize: reference.packSize || '', packingType: reference.packingType || '', packingStandard: reference.packingStandard || '', onHand: 0, reorder, batch: '', expiry: '', price });
    state.view = 'inventory';
  } else if (action === 'receive-stock-submit' || action === 'receive-one-submit') {
    const drug = drugFor(action === 'receive-one-submit' ? id : values.drugId);
    if (!drug) return;
    const quantity = Math.floor(Number(values.quantity));
    if (quantity < 1) return notify('Enter a quantity greater than zero.');
    if (drug.onHand === 0 && (!values.batch.trim() || !values.expiry || Number.isNaN(new Date(`${values.expiry}T00:00:00`).getTime()))) return notify('Enter this stock batch number and expiry date before receiving the first stock.');
    drug.onHand += quantity;
    if (values.batch) drug.batch = values.batch;
    if (values.expiry) drug.expiry = new Date(`${values.expiry}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    state.view = 'inventory';
  } else if (action === 'create-po') {
    const drug = drugFor(values.drugId);
    const quantity = Math.floor(Number(values.quantity));
    if (!drug || quantity < 1) return notify('Choose a product and quantity greater than zero.');
    const item = { drugId: drug.id, name: drug.name, quantity, cost: Math.round(drug.price * .48 * 100) / 100 };
    const order = { id: `PO-${1043 + data.purchaseOrders.length - 2}`, supplier: canPerformRole('Admin') ? values.supplier : '', status: 'Draft', created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), items: [item], createdBy: data.employees.find((employee) => employee.id === state.employeeId)?.name || state.role, audit: [] };
    recordPoAudit(order, `Created draft with ${quantity} × ${drug.name}`);
    data.purchaseOrders.unshift(order);
    state.view = 'purchase-orders';
  } else if (action === 'add-po-item-submit') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    const drug = drugFor(values.drugId);
    const quantity = Math.floor(Number(values.quantity));
    if (!order || order.status !== 'Draft' || !drug || quantity < 1) return notify('Choose a product and quantity greater than zero.');
    const existing = order.items.find((item) => item.drugId === drug.id);
    if (existing) existing.quantity += quantity;
    else order.items.push({ drugId: drug.id, name: drug.name, quantity, cost: Math.round(drug.price * .48 * 100) / 100 });
    recordPoAudit(order, `Added ${quantity} × ${drug.name}`);
    state.view = 'purchase-orders';
  } else if (action === 'send-po') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order || !values.supplier || !order.items.length) return notify('Choose a supplier and add at least one item.');
    const approver = data.employees.find((employee) => employee.id === state.employeeId)?.name || state.role;
    order.supplier = values.supplier;
    order.status = 'Sent';
    order.approvedBy = approver;
    order.approvedAt = new Date().toISOString();
    recordPoAudit(order, `Approved and sent to ${values.supplier}`, approver);
    state.view = 'purchase-orders';
  } else if (action === 'view-only') {
    $('#modal-root').innerHTML = '';
    return;
  }
  save();
  $('#modal-root').innerHTML = '';
  render();
  const messages = { 'create-employee': 'Employee account created.', 'create-patient': 'Patient added.', 'create-doctor': 'Doctor added.', 'create-company': 'Company profile created with a separate Admin and workspace.', 'rename-company-submit': 'Company profile renamed.', 'edit-patient-submit': 'Patient details updated.', 'edit-doctor-submit': 'Doctor details updated.', 'create-supplier': 'Supplier added.', 'save-supplier': 'Supplier updated.', 'create-reference-drug': 'Product added with zero stock. Receive stock to make it available for sale.', 'receive-stock-submit': 'Inventory updated.', 'receive-one-submit': 'Inventory updated.', 'create-po': 'Purchase order draft created.', 'add-po-item-submit': 'Product added to the draft.', 'send-po': 'Purchase order approved and marked sent.' };
  notify(messages[action] || 'Changes saved.');
}

function applyInventoryFilters() {
  const rows = $('#inventory-rows');
  if (!rows) return;
  const query = ($('#inventory-search')?.value || '').toLowerCase();
  const filter = $('#inventory-filter')?.value || 'All stock';
  $$('tr', rows).forEach((row) => {
    const matchesQuery = row.dataset.search.includes(query);
    const matchesStock = filter === 'All stock'
      || (filter === 'Low stock' && row.dataset.stock === 'low')
      || (filter === 'No stock' && row.dataset.stock === 'none')
      || (filter === 'In stock' && row.dataset.stock === 'in');
    row.hidden = !matchesQuery || !matchesStock;
  });
}

document.addEventListener('click', (event) => {
  const demoAccount = event.target.closest('[data-demo-email]');
  if (demoAccount) {
    $('#login-email').value = demoAccount.dataset.demoEmail;
    $('#login-password').value = demoAccount.dataset.demoPassword;
    $('#login-password').focus();
    $('#login-error').hidden = true;
    return;
  }
  const nav = event.target.closest('[data-view], [data-nav]');
  if (nav) {
    const view = nav.dataset.view || nav.dataset.nav;
    if (permissions[state.role].includes(view)) {
      state.view = view;
      render();
      $('#sidebar').classList.remove('open');
    } else notify('This view is not available for your role.');
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;
  if (actionButton.dataset.action === 'dismiss-modal' && actionButton.classList.contains('modal-backdrop')) {
    if (event.target === actionButton) $('#modal-root').innerHTML = '';
    return;
  }
  if (actionButton.dataset.action === 'dismiss-modal' && actionButton.closest('.modal')) {
    $('#modal-root').innerHTML = '';
    return;
  }
  handleAction(actionButton.dataset.action, actionButton.dataset.id, actionButton);
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'login-form') {
    event.preventDefault();
    const email = $('#login-email').value.trim().toLowerCase();
    const password = $('#login-password').value;
    const superadmin = data.superadmins.find((item) => item.active && item.email.toLowerCase() === email && item.password === password);
    const employee = superadmin || data.companyProfiles
      .flatMap((company) => (company.companyData?.employees || []).map((item) => ({ ...item, companyId: company.id })))
      .find((item) => item.active && item.email.toLowerCase() === email && item.password === password);
    if (!employee) {
      $('#login-error').textContent = 'That email and password do not match an active account.';
      $('#login-error').hidden = false;
      return;
    }
    if (employee.companyId && employee.companyId !== data.activeCompanyId) switchCompanyProfile(employee.companyId);
    signIn(employee);
  } else if (event.target.id === 'modal-form') {
    event.preventDefault();
    handleFormSubmit(event.target);
  }
});

document.addEventListener('input', (event) => {
  const input = event.target;
  if (input.id === 'reference-search') {
    renderDrugReferenceResults(input.value);
  } else if (input.id === 'inventory-search') {
    state.inventoryQuery = input.value;
    applyInventoryFilters();
  } else if (input.id === 'patient-search') {
    state.patientQuery = input.value;
    $('#content').innerHTML = renderPatients();
    $('#patient-search').focus();
    $('#patient-search').setSelectionRange(input.value.length, input.value.length);
  } else if (input.id === 'doctor-search' || input.id === 'supplier-search') {
    if (input.id === 'doctor-search') state.doctorQuery = input.value;
    else state.supplierQuery = input.value;
    const query = input.value.toLowerCase();
    $$('tr[data-search]', $('#content')).forEach((row) => { row.hidden = !row.dataset.search.includes(query); });
  } else if (input.id === 'pos-search') {
    const query = input.value.toLowerCase();
    $$('.pos-product').forEach((button) => { button.hidden = !button.textContent.toLowerCase().includes(query); });
  } else if (input.id === 'pos-discount-percent') {
    state.posDiscountPercent = Math.min(100, Math.max(0, Number(input.value) || 0));
    render();
  } else if (input.id === 'pos-discount-flat') {
    state.posDiscountFlat = Math.max(0, Number(input.value) || 0);
    render();
  } else if (input.id === 'global-search') {
    state.globalQuery = input.value.trim().toLowerCase();
    if (state.globalQuery.length < 2) return;
    const patient = permissions[state.role].includes('patients') ? data.patients.find((item) => `${item.name} ${item.id}`.toLowerCase().includes(state.globalQuery)) : null;
    const drug = data.drugs.find((item) => `${item.name} ${item.generic}`.toLowerCase().includes(state.globalQuery));
    if (patient) {
      state.view = 'patients'; state.patientQuery = patient.name; render(); $('#patient-search')?.focus();
    } else if (drug && permissions[state.role].includes('inventory')) {
      state.view = 'inventory'; state.inventoryQuery = drug.name; render(); $('#inventory-search')?.focus();
    } else if (drug && permissions[state.role].includes('pos')) {
      state.view = 'pos'; render();
      const search = $('#pos-search');
      search.value = drug.name;
      search.dispatchEvent(new Event('input', { bubbles: true }));
      search.focus();
    }
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target.id === 'inventory-filter') applyInventoryFilters();
  else if (target.id === 'prescription-filter') { state.prescriptionFilter = target.value; render(); }
  else if (target.id === 'po-filter') { state.poFilter = target.value; render(); }
});

$('#mobile-menu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#dismiss-viewport-notice').addEventListener('click', () => {
  viewportNoticeDismissed = true;
  $('#viewport-notice').hidden = true;
});
window.addEventListener('resize', updateViewportNotice);
$('#notifications-button').addEventListener('click', () => {
  if (canPerformRole('Admin', 'Pharmacist')) notify(`${pendingCount()} prescriptions and ${lowStock().length} low-stock products need attention.`);
  else if (state.role === 'Technician') notify(`${lowStock().length} products are at or below their reorder point.`);
  else notify('No new shift notifications.');
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#global-search').focus();
  }
  if (event.key === 'Escape') $('#modal-root').innerHTML = '';
});

renderLoginAccounts();
$('#login-email').focus();