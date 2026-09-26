const STORAGE_KEY = 'hamsaahrx-pharmacy-demo-v1';
const LEGACY_STORAGE_KEY = 'fieldnote-pharmacy-demo-v1';
const INR_PER_LEGACY_UNIT = 84;

const initialData = {
  currency: 'legacy',
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
    { id: 'RX-002', name: 'Atorvastatin 20mg', generic: 'Atorvastatin', category: 'Cardiovascular', onHand: 86, reorder: 30, batch: 'ATV-2501C', expiry: 'Jan 20, 2027', price: 18, supplier: 'MedSource Co.' },
    { id: 'RX-003', name: 'Metformin 850mg', generic: 'Metformin', category: 'Diabetes care', onHand: 9, reorder: 25, batch: 'MET-2411B', expiry: 'Nov 08, 2026', price: 9.75, supplier: 'WellCare Distribution' },
    { id: 'RX-004', name: 'Cetirizine 10mg', generic: 'Cetirizine', category: 'Allergy', onHand: 142, reorder: 35, batch: 'CTZ-2503D', expiry: 'Mar 11, 2027', price: 7.25, supplier: 'Northwest Pharma' },
    { id: 'RX-005', name: 'Lisinopril 10mg', generic: 'Lisinopril', category: 'Cardiovascular', onHand: 7, reorder: 20, batch: 'LIS-2412A', expiry: 'Dec 17, 2026', price: 11, supplier: 'MedSource Co.' },
    { id: 'RX-006', name: 'Omeprazole 20mg', generic: 'Omeprazole', category: 'Gastrointestinal', onHand: 64, reorder: 24, batch: 'OMP-2502B', expiry: 'Feb 18, 2027', price: 10.5, supplier: 'WellCare Distribution' },
    { id: 'RX-007', name: 'Vitamin D3 1000 IU', generic: 'Cholecalciferol', category: 'Supplement', onHand: 18, reorder: 28, batch: 'VTD-2504F', expiry: 'Apr 30, 2027', price: 8.25, supplier: 'Northwest Pharma' },
    { id: 'RX-008', name: 'Ibuprofen 200mg', generic: 'Ibuprofen', category: 'Pain relief', onHand: 210, reorder: 40, batch: 'IBU-2505E', expiry: 'May 12, 2027', price: 6.5, supplier: 'WellCare Distribution' },
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

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY));
    if (stored && stored.drugs && stored.patients && stored.purchaseOrders) {
      const restored = { ...structuredClone(initialData), ...stored };
      migrateCurrency(restored);
      migrateAccountEmails(restored);
      return restored;
    }
  } catch { /* A malformed demo save should not block the app. */ }
  const fresh = structuredClone(initialData);
  migrateCurrency(fresh);
  migrateAccountEmails(fresh);
  return fresh;
}

const data = loadData();
const state = { view: 'overview', role: 'Admin', employeeId: null, inventoryQuery: '', patientQuery: '', doctorQuery: '', supplierQuery: '', prescriptionFilter: 'All prescriptions', poFilter: 'All orders', globalQuery: '' };
const permissions = {
  Admin: ['overview', 'pos', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'suppliers', 'reports', 'employees'],
  Pharmacist: ['overview', 'prescriptions', 'inventory', 'purchase-orders', 'patients', 'doctors', 'reports'],
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
  employees: ['Employee access', 'Manage the people who can sign in to Ham-SaAh Rx.']
};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value) || 0);
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.removeItem(LEGACY_STORAGE_KEY);
};
const pendingCount = () => data.prescriptions.filter((item) => item.status === 'Pending review').length;
const lowStock = () => data.drugs.filter((drug) => drug.onHand <= drug.reorder);
const initialsFor = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');
const drugFor = (id) => data.drugs.find((drug) => drug.id === id);

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
  return '';
}

function statusBadge(status) {
  return `<span class="status ${statusClass(status)}">${escapeHtml(status)}</span>`;
}

function setHeading() {
  const [title, subtitle] = headings[state.view] || headings.overview;
  const isOverview = state.view === 'overview';
  const employee = data.employees.find((item) => item.id === state.employeeId);
  $('#page-title').textContent = isOverview ? `Good morning, ${employee?.name.split(' ')[0] || state.role}` : title;
  $('#page-subtitle').textContent = isOverview ? subtitle : state.role === 'Technician' && state.view === 'purchase-orders' ? 'Add stock needs to the queue for admin review.' : subtitle;
  $('#breadcrumb-current').textContent = isOverview ? 'Overview' : title;
  $('#page-eyebrow').textContent = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date()).toUpperCase();
  const headingActions = $('#heading-actions');
  if (state.view === 'pos' && ['Admin', 'Cashier'].includes(state.role)) headingActions.innerHTML = `<button class="button" data-action="clear-cart">Clear basket</button>`;
  else if (state.view === 'inventory' && ['Admin', 'Technician', 'Pharmacist'].includes(state.role)) headingActions.innerHTML = `<button class="button button-primary" data-action="receive-stock">＋ Receive stock</button>`;
  else if (state.view === 'patients' && ['Admin', 'Pharmacist', 'Technician'].includes(state.role)) headingActions.innerHTML = `<button class="button button-primary" data-action="add-patient">＋ Add patient</button>`;
  else if (state.view === 'doctors' && ['Admin', 'Pharmacist'].includes(state.role)) headingActions.innerHTML = `<button class="button button-primary" data-action="add-doctor">＋ Add doctor</button>`;
  else if (state.view === 'suppliers' && state.role === 'Admin') headingActions.innerHTML = `<button class="button button-primary" data-action="add-supplier">＋ Add supplier</button>`;
  else if (state.view === 'purchase-orders' && ['Admin', 'Pharmacist', 'Technician'].includes(state.role)) headingActions.innerHTML = `<button class="button button-primary" data-action="new-po">＋ New purchase order</button>`;
  else if (state.view === 'employees' && state.role === 'Admin') headingActions.innerHTML = `<button class="button button-primary" data-action="add-employee">＋ Add employee</button>`;
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
  const employee = data.employees.find((item) => item.id === state.employeeId);
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
    employees: renderEmployees
  };
  $('#content').innerHTML = (views[state.view] || renderOverview)();
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
  if (state.view === 'prescriptions' && !['Admin', 'Pharmacist'].includes(state.role)) {
    $$('[data-action="approve-rx"], [data-action="reject-rx"], [data-action="dispense-rx"]', $('#content')).forEach((button) => button.remove());
  }
  if (state.view === 'purchase-orders' && state.role === 'Admin') {
    $$('.po-card', $('#content')).forEach((card) => {
      const sourceButton = card.querySelector('.po-card-actions [data-id]');
      const actions = card.querySelector('.po-card-actions');
      if (!sourceButton || !actions) return;
      const auditButton = document.createElement('button');
      auditButton.className = 'button button-small';
      auditButton.dataset.action = 'view-audit';
      auditButton.dataset.id = sourceButton.dataset.id;
      auditButton.textContent = 'Audit trail';
      actions.append(auditButton);
    });
  }
  $('#sidebar').classList.remove('open');
}

function metric(label, value, foot, icon, color, trend = '') {
  return `<div class="metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon ${color}">${icon}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${trend ? `<span class="${trend.startsWith('↑') ? 'trend-up' : 'trend-down'}">${trend}</span>` : ''}${foot}</div></div>`;
}

function renderOverview() {
  const alerts = lowStock().slice(0, 3);
  const visibleSales = state.role === 'Cashier' ? data.sales.filter((sale) => sale.employeeId === state.employeeId) : data.sales;
  const recentSales = visibleSales.slice(0, 4);
  const isTechnician = state.role === 'Technician';
  const metrics = isTechnician
    ? `${metric('Products tracked', String(data.drugs.length), 'across active batches', 'Rx', 'green')}${metric('Items to reorder', String(lowStock().length).padStart(2, '0'), 'below reorder threshold', '!', 'orange')}${metric('Open purchase orders', String(data.purchaseOrders.filter((order) => order.status !== 'Sent').length), 'draft or awaiting approval', '⇄', 'blue')}${metric('Units on hand', String(data.drugs.reduce((sum, drug) => sum + drug.onHand, 0)), 'across the dispensary', '▤', 'lime')}`
    : state.role === 'Cashier'
      ? `${metric('Shift sales', money(107898), 'today · Northside', '↗', 'green', '↑ 12.8%')}${metric('Transactions', '38', 'this shift', '▣', 'blue', '↑ 4')}${metric('Avg. basket', money(2031.12), 'vs. last week', '◷', 'lime', '↑ 7.0%')}${metric('Returns', '0', 'awaiting review', '↶', 'orange')}`
      : `${metric('Today’s sales', money(107898), 'vs. previous Saturday', '↗', 'green', '↑ 12.8%')}${metric('Prescriptions', '38', '6 awaiting pickup', 'Rx', 'blue', '↑ 4')}${metric('Items to reorder', String(lowStock().length).padStart(2, '0'), 'below reorder threshold', '!', 'orange', '')}${metric('Avg. basket', money(2031.12), 'vs. last week', '◷', 'lime', '↑ 7.0%')}`;
  const quickActions = [];
  if (permissions[state.role].includes('pos')) quickActions.push('<button class="quick-action" data-nav="pos"><span class="quick-action-icon">▣</span><span>New sale</span></button>');
  if (['Admin', 'Pharmacist', 'Technician'].includes(state.role)) quickActions.push('<button class="quick-action" data-action="add-patient"><span class="quick-action-icon">♙</span><span>Add patient</span></button>');
  else if (permissions[state.role].includes('patients')) quickActions.push('<button class="quick-action" data-nav="patients"><span class="quick-action-icon">♙</span><span>Find patient</span></button>');
  if (permissions[state.role].includes('prescriptions')) quickActions.push('<button class="quick-action" data-nav="prescriptions"><span class="quick-action-icon">Rx</span><span>Review Rx</span></button>');
  if (permissions[state.role].includes('purchase-orders')) quickActions.push('<button class="quick-action" data-nav="purchase-orders"><span class="quick-action-icon">⇄</span><span>Restock queue</span></button>');
  if (state.role === 'Cashier') quickActions.push('<button class="quick-action" data-nav="reports"><span class="quick-action-icon">▥</span><span>Shift reports</span></button>');
  const activityPanel = isTechnician
    ? `<div class="panel activity-panel"><div class="panel-heading"><div><h2>Stock needing a closer look</h2><p>Products at or below their reorder threshold</p></div><button class="text-link" data-nav="inventory">View inventory →</button></div><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>ON HAND</th><th>REORDER AT</th><th>STATUS</th></tr></thead><tbody>${alerts.map((drug) => `<tr><td class="cell-primary">${escapeHtml(drug.name)}</td><td>${drug.onHand}</td><td>${drug.reorder}</td><td>${statusBadge('Low stock')}</td></tr>`).join('') || '<tr><td colspan="4"><div class="empty-state">No stock items need attention.</div></td></tr>'}</tbody></table></div></div>`
    : `<div class="panel activity-panel"><div class="panel-heading"><div><h2>Recent transactions</h2><p>Today · Northside Pharmacy</p></div><button class="text-link" data-nav="${permissions[state.role].includes('pos') ? 'pos' : 'reports'}">${permissions[state.role].includes('pos') ? 'View all' : 'View reports'} →</button></div><div class="table-wrap"><table><thead><tr><th>INVOICE</th><th>PATIENT</th><th>TIME</th><th>ITEMS</th><th>PAYMENT</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>${recentSales.map((sale) => `<tr><td class="cell-primary">${escapeHtml(sale.id)}</td><td>${escapeHtml(sale.patient)}</td><td>${escapeHtml(sale.time)}</td><td>${sale.items} item${sale.items === 1 ? '' : 's'}</td><td>${escapeHtml(sale.payment)}</td><td class="cell-primary">${money(sale.total)}</td><td>${statusBadge(sale.status)}</td></tr>`).join('')}</tbody></table></div></div>`;
  const chartPanel = isTechnician
    ? `<div class="panel sales-panel"><div class="panel-heading"><div><h2>Stock summary</h2><p>Available units across active product lines</p></div><button class="text-link" data-nav="inventory">Inventory →</button></div><div class="panel-body"><div class="report-grid" style="grid-template-columns:1fr 1fr;margin:0"><div class="report-stat"><span>Units on hand</span><strong>${data.drugs.reduce((sum, drug) => sum + drug.onHand, 0)}</strong><small>Across ${data.drugs.length} products</small></div><div class="report-stat"><span>Below reorder point</span><strong>${lowStock().length}</strong><small>${data.purchaseOrders.filter((order) => order.status !== 'Sent').length} open order(s)</small></div></div></div></div>`
    : `<div class="panel sales-panel"><div class="panel-heading"><div><h2>${state.role === 'Cashier' ? 'Shift sales' : 'Sales overview'}</h2><p>Daily revenue and prescription sales</p></div><select class="range-select" aria-label="Sales chart date range"><option>This week</option><option>This month</option></select></div><div class="panel-body"><div class="sales-chart"><div class="axis-labels"><span>${money(150000)}</span><span>${money(100000)}</span><span>${money(50000)}</span><span>${money(0)}</span></div><div class="chart-stage">${[['M',54],['T',68],['W',47],['T',78],['F',63],['S',88],['S',71],['M',42]].map(([day, height]) => `<div class="chart-column"><div class="bar-stack" style="--bar:${height}%"><i></i></div><span class="bar-label">${day}</span></div>`).join('')}</div></div><div class="chart-legend"><span><i class="legend-dot"></i>Prescription</span><span><i class="legend-dot alt"></i>OTC & other</span></div></div></div>`;
  const attentionPanel = state.role === 'Cashier' ? '' : `<div class="panel attention-panel"><div class="attention-banner"><span class="attention-symbol">!</span><span><strong>Needs your attention</strong><small>${lowStock().length} items need a restock plan</small></span></div><div class="alert-list">${alerts.length ? alerts.map((drug) => `<div class="alert-row"><span class="drug-pill">${escapeHtml(initialsFor(drug.generic))}</span><span class="alert-copy"><strong>${escapeHtml(drug.name)}</strong><small>${escapeHtml(drug.id)} · reorder at ${drug.reorder}</small></span><span class="alert-qty">${drug.onHand} left</span></div>`).join('') : '<div class="empty-state">Stock levels look healthy.</div>'}<button class="text-link" data-nav="inventory">Review inventory →</button></div></div>`;
  return `<div class="metric-grid">${metrics}</div>
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
  const subtotal = cartItems.reduce((sum, line) => sum + line.drug.price * line.quantity, 0);
  const tax = subtotal * .0825;
  const total = subtotal + tax;
  return `<div class="pos-layout" style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(280px,.8fr);gap:14px;align-items:start"><section class="panel"><div class="panel-heading"><div><h2>Choose products</h2><p>Search by name or generic</p></div><span class="status">${data.drugs.length} products</span></div><div class="panel-body"><label class="search-field" style="width:100%;margin-bottom:11px"><span>⌕</span><input id="pos-search" type="search" placeholder="Find a medication..."></label><div class="pos-products" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px">${data.drugs.filter((drug) => drug.onHand > 0).map((drug) => `<button class="quick-action pos-product" data-action="add-cart" data-id="${escapeHtml(drug.id)}" style="min-height:58px"><span class="medicine-mark">Rx</span><span style="min-width:0;flex:1;text-align:left"><strong style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px">${escapeHtml(drug.name)}</strong><small style="display:block;margin-top:4px;color:#87928a;font-size:8px">${drug.onHand} in stock</small></span><strong style="font-size:9px">${money(drug.price)}</strong></button>`).join('')}</div></div></section>
    <section class="panel"><div class="panel-heading"><div><h2>Current sale</h2><p>${cartItems.length} product${cartItems.length === 1 ? '' : 's'} in basket</p></div><span class="status">${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span></div><div class="panel-body"><div class="form-field" style="margin-bottom:13px"><label for="pos-patient">Patient</label><select id="pos-patient"><option value="Walk-in customer">Walk-in customer</option>${data.patients.map((patient) => `<option value="${escapeHtml(patient.name)}">${escapeHtml(patient.name)} · ${escapeHtml(patient.id)}</option>`).join('')}</select></div>${cartItems.length ? cartItems.map((line) => `<div class="summary-line" style="align-items:center"><span style="flex:1"><strong>${escapeHtml(line.drug.name)}</strong><small class="cell-sub">${money(line.drug.price)} each</small></span><span class="table-actions"><button class="button button-small" data-action="cart-dec" data-id="${escapeHtml(line.drugId)}" aria-label="Decrease quantity">−</button><strong>${line.quantity}</strong><button class="button button-small" data-action="cart-inc" data-id="${escapeHtml(line.drugId)}" aria-label="Increase quantity">＋</button></span><strong style="min-width:54px;text-align:right">${money(line.drug.price * line.quantity)}</strong></div>`).join('') : `<div class="empty-state"><strong>Your basket is empty</strong>Select a product to start a sale.</div>`}<div style="margin-top:11px;padding-top:6px;border-top:1px solid #edf0ed"><div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><div class="summary-line"><span>Tax (8.25%)</span><strong>${money(tax)}</strong></div><div class="summary-line summary-total"><strong>Total due</strong><strong>${money(total)}</strong></div></div><div class="form-field" style="margin-top:12px"><label for="pos-payment">Payment method</label><select id="pos-payment"><option>Card</option><option>Cash</option><option>Insurance</option></select></div><button class="button button-primary" data-action="checkout" style="width:100%;margin-top:12px" ${cartItems.length ? '' : 'disabled'}>Charge ${money(total)}</button></div></section></div>`;
}

function renderInventory() {
  const rows = data.drugs.filter((drug) => `${drug.name} ${drug.generic} ${drug.category} ${drug.batch}`.toLowerCase().includes(state.inventoryQuery.toLowerCase()));
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="inventory-search" type="search" placeholder="Search inventory..." value="${escapeHtml(state.inventoryQuery)}"></label><select id="inventory-filter" class="filter-select"><option>All stock</option><option>Low stock</option><option>In stock</option></select></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.drugs.length} products · ${lowStock().length} low stock</span></div></div>
  <div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>MEDICATION</th><th>CATEGORY</th><th>ON HAND</th><th>REORDER AT</th><th>BATCH / EXPIRY</th><th>UNIT PRICE</th><th>STATUS</th><th></th></tr></thead><tbody id="inventory-rows">${rows.map((drug) => `<tr data-search="${escapeHtml(`${drug.name} ${drug.generic} ${drug.category} ${drug.batch}`.toLowerCase())}" data-stock="${drug.onHand <= drug.reorder ? 'low' : 'in'}"><td><span class="inventory-name"><span class="medicine-mark ${drug.category === 'Pain relief' ? 'capsule' : ''}">Rx</span><span class="cell-primary">${escapeHtml(drug.name)}<small class="cell-sub">${escapeHtml(drug.generic)} · ${escapeHtml(drug.id)}</small></span></span></td><td>${escapeHtml(drug.category)}</td><td><span class="stock-track"><i class="${drug.onHand <= drug.reorder ? 'low-bar' : ''}" style="width:${Math.min(100, Math.round(drug.onHand / Math.max(drug.reorder * 2, 1) * 100))}%"></i></span><span class="cell-primary">${drug.onHand}</span></td><td>${drug.reorder} units</td><td>${escapeHtml(drug.batch)}<small class="cell-sub">Expires ${escapeHtml(drug.expiry)}</small></td><td>${money(drug.price)}</td><td>${statusBadge(drug.onHand <= drug.reorder ? 'Low stock' : 'In stock')}</td><td>${['Admin', 'Technician', 'Pharmacist'].includes(state.role) ? `<button class="button button-small" data-action="receive-one" data-id="${escapeHtml(drug.id)}">＋ Receive</button>` : ''}</td></tr>`).join('') || `<tr><td colspan="8"><div class="empty-state">No products match that search.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Showing ${rows.length} of ${data.drugs.length} products</span><span>Stock updated just now</span></div></div>`;
}

function renderPrescriptions() {
  const filtered = data.prescriptions.filter((prescription) => state.prescriptionFilter === 'All prescriptions' || prescription.status === state.prescriptionFilter);
  return `<div class="toolbar"><div class="toolbar-left"><select id="prescription-filter" class="filter-select">${['All prescriptions', 'Pending review', 'Approved', 'Dispensed', 'Rejected'].map((item) => `<option ${state.prescriptionFilter === item ? 'selected' : ''}>${item}</option>`).join('')}</select><span style="color:#829087;font-size:9px">${pendingCount()} need review</span></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.prescriptions.length} prescriptions</span></div></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>RX NUMBER</th><th>PATIENT</th><th>PRESCRIBER</th><th>MEDICATION & DIRECTIONS</th><th>RECEIVED</th><th>STATUS</th><th>REVIEW</th></tr></thead><tbody>${filtered.map((rx) => `<tr><td class="cell-primary">${escapeHtml(rx.id)}</td><td><span class="cell-primary">${escapeHtml(rx.patient)}</span><small class="cell-sub">${escapeHtml(rx.patientId)}</small></td><td>${escapeHtml(rx.doctor)}</td><td><span class="cell-primary">${escapeHtml(rx.medication)}</span><small class="cell-sub">${escapeHtml(rx.directions)}</small>${rx.allergy ? `<small class="cell-sub" style="color:#b75a51">⚠ ${escapeHtml(rx.allergy)}</small>` : ''}</td><td>${escapeHtml(rx.received)}</td><td>${statusBadge(rx.status)}</td><td>${['Admin', 'Pharmacist'].includes(state.role) && rx.status === 'Pending review' ? `<span class="table-actions"><button class="button button-small" data-action="approve-rx" data-id="${escapeHtml(rx.id)}">Approve</button><button class="button button-small button-danger" data-action="reject-rx" data-id="${escapeHtml(rx.id)}">Reject</button></span>` : rx.status === 'Approved' && ['Admin', 'Pharmacist'].includes(state.role) ? `<button class="button button-small button-primary" data-action="dispense-rx" data-id="${escapeHtml(rx.id)}">Mark dispensed</button>` : '—'}</td></tr>`).join('') || `<tr><td colspan="7"><div class="empty-state">No prescriptions in this view.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Showing ${filtered.length} prescriptions</span><span>Clinical review actions are recorded locally in this demo.</span></div></div>`;
}

function renderPurchaseOrders() {
  const filtered = data.purchaseOrders.filter((order) => state.poFilter === 'All orders' || order.status === state.poFilter);
  const draftItems = data.purchaseOrders.filter((order) => order.status === 'Draft').reduce((sum, order) => sum + order.items.length, 0);
  return `<div class="toolbar"><div class="toolbar-left"><select id="po-filter" class="filter-select">${['All orders', 'Draft', 'Pending approval', 'Sent'].map((item) => `<option ${state.poFilter === item ? 'selected' : ''}>${item}</option>`).join('')}</select><span style="color:#829087;font-size:9px">${draftItems} line items in drafts</span></div><div class="toolbar-right"><span style="color:#829087;font-size:9px">${data.purchaseOrders.length} orders</span></div></div><div class="po-layout"><div class="panel"><div class="panel-heading"><div><h2>Order queue</h2><p>Requests from your pharmacy team</p></div></div>${filtered.length ? filtered.map((order) => `<article class="po-card"><div class="po-card-top"><div><span class="po-number">${escapeHtml(order.id)} · CREATED ${escapeHtml(order.created.toUpperCase())}</span><h3>${escapeHtml(order.supplier || 'Supplier not assigned')}</h3><p>Created by ${escapeHtml(order.createdBy || 'Pharmacy team')}</p></div>${statusBadge(order.status)}</div><div class="po-meta"><span><strong>${order.items.length}</strong> line item${order.items.length === 1 ? '' : 's'}</span><span>Est. <strong>${money(order.items.reduce((sum, item) => sum + item.cost * item.quantity, 0))}</strong></span></div><div class="po-card-actions">${['Admin', 'Pharmacist', 'Technician'].includes(state.role) && order.status === 'Draft' ? `<button class="button button-small" data-action="add-po-item" data-id="${escapeHtml(order.id)}">＋ Add item</button>` : ''}${state.role === 'Admin' && (order.status === 'Draft' || order.status === 'Pending approval') ? `<button class="button button-small button-primary" data-action="finalize-po" data-id="${escapeHtml(order.id)}">${order.status === 'Draft' ? 'Review & send' : 'Approve & send'}</button>` : ''}${state.role === 'Admin' && order.status === 'Sent' ? `<button class="button button-small" data-action="email-po" data-id="${escapeHtml(order.id)}">Email supplier</button><button class="button button-small" data-action="print-po" data-id="${escapeHtml(order.id)}">Print / PDF</button>` : ''}</div></article>`).join('') : `<div class="empty-state"><strong>No orders here yet</strong>Restock requests will appear here.</div>`}</div><aside class="panel"><div class="panel-heading"><div><h2>Restock snapshot</h2><p>Based on current shelf levels</p></div></div><div class="panel-body"><div class="summary-line"><span>Below threshold</span><strong>${lowStock().length} products</strong></div><div class="summary-line"><span>Draft / awaiting review</span><strong>${data.purchaseOrders.filter((order) => ['Draft', 'Pending approval'].includes(order.status)).length} orders</strong></div><div class="summary-line"><span>Sent to supplier</span><strong>${data.purchaseOrders.filter((order) => order.status === 'Sent').length} orders</strong></div><div style="margin-top:12px"><button class="button" data-nav="inventory" style="width:100%">Check low stock</button></div></div></aside></div>`;
}

function renderPatients() {
  const patients = data.patients.filter((patient) => `${patient.name} ${patient.id} ${patient.phone}`.toLowerCase().includes(state.patientQuery.toLowerCase()));
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="patient-search" type="search" placeholder="Search patients..." value="${escapeHtml(state.patientQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.patients.length} patients</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>PATIENT</th><th>AGE</th><th>PHONE</th><th>ALLERGIES</th><th>LAST VISIT</th><th>RECORD</th></tr></thead><tbody>${patients.map((patient, index) => `<tr data-search="${escapeHtml(`${patient.name} ${patient.id} ${patient.phone}`.toLowerCase())}"><td><span class="patient-cell"><span class="avatar ${index % 3 === 1 ? 'avatar-blue' : index % 3 === 2 ? 'avatar-orange' : 'avatar-green'}">${escapeHtml(patient.initials || initialsFor(patient.name))}</span><span class="cell-primary">${escapeHtml(patient.name)}<small class="cell-sub">${escapeHtml(patient.id)}</small></span></span></td><td>${patient.age}</td><td>${escapeHtml(patient.phone)}</td><td>${escapeHtml(patient.allergies)}</td><td>${escapeHtml(patient.lastVisit)}</td><td><button class="text-link" data-action="patient-history" data-id="${escapeHtml(patient.id)}">View history</button></td></tr>`).join('') || `<tr><td colspan="6"><div class="empty-state">No patients match that search.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Showing ${patients.length} of ${data.patients.length} patients</span><span>Patient records are demo data.</span></div></div>`;
}

function renderDoctors() {
  const doctors = data.doctors.filter((doctor) => `${doctor.name} ${doctor.specialty} ${doctor.email}`.toLowerCase().includes(state.doctorQuery.toLowerCase()));
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="doctor-search" type="search" placeholder="Search doctors..." value="${escapeHtml(state.doctorQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.doctors.length} clinicians</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>CLINICIAN</th><th>SPECIALTY</th><th>PHONE</th><th>EMAIL</th><th>REFERRALS</th><th>STATUS</th></tr></thead><tbody>${doctors.map((doctor, index) => `<tr data-search="${escapeHtml(`${doctor.name} ${doctor.specialty} ${doctor.email}`.toLowerCase())}"><td><span class="patient-cell"><span class="avatar ${index % 2 ? 'avatar-blue' : 'avatar-green'}">${escapeHtml(initialsFor(doctor.name.replace(/^Dr\.\s*/, '')))}</span><span class="cell-primary">${escapeHtml(doctor.name)}<small class="cell-sub">${escapeHtml(doctor.id)}</small></span></span></td><td>${escapeHtml(doctor.specialty)}</td><td>${escapeHtml(doctor.phone)}</td><td>${escapeHtml(doctor.email)}</td><td>${doctor.referrals} this month</td><td>${statusBadge('Active')}</td></tr>`).join('') || `<tr><td colspan="6"><div class="empty-state">No doctors match that search.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Showing ${doctors.length} of ${data.doctors.length} clinicians</span><span>Provider directory · Northside</span></div></div>`;
}

function renderSuppliers() {
  const suppliers = data.suppliers.filter((supplier) => `${supplier.name} ${supplier.contact} ${supplier.email}`.toLowerCase().includes(state.supplierQuery.toLowerCase()));
  return `<div class="toolbar"><div class="toolbar-left"><label class="search-field"><span>⌕</span><input id="supplier-search" type="search" placeholder="Search suppliers..." value="${escapeHtml(state.supplierQuery)}"></label></div><span style="color:#829087;font-size:9px">${data.suppliers.filter((supplier) => supplier.active).length} active partners</span></div><div class="panel table-panel"><div class="table-wrap"><table><thead><tr><th>SUPPLIER</th><th>CONTACT</th><th>EMAIL</th><th>PHONE</th><th>TERMS</th><th>STATUS</th><th></th></tr></thead><tbody>${suppliers.map((supplier) => `<tr data-search="${escapeHtml(`${supplier.name} ${supplier.contact} ${supplier.email}`.toLowerCase())}"><td><span class="cell-primary">${escapeHtml(supplier.name)}</span><small class="cell-sub">${escapeHtml(supplier.id)}</small></td><td>${escapeHtml(supplier.contact)}</td><td>${escapeHtml(supplier.email)}</td><td>${escapeHtml(supplier.phone)}</td><td>${escapeHtml(supplier.terms)}</td><td>${statusBadge(supplier.active ? 'Active' : 'Inactive')}</td><td>${state.role === 'Admin' && supplier.active ? `<button class="button button-small" data-action="edit-supplier" data-id="${escapeHtml(supplier.id)}">Edit</button> <button class="button button-small button-danger" data-action="deactivate-supplier" data-id="${escapeHtml(supplier.id)}">Deactivate</button>` : ''}</td></tr>`).join('') || `<tr><td colspan="7"><div class="empty-state">No suppliers match that search.</div></td></tr>`}</tbody></table></div><div class="table-foot"><span>Supplier agency records</span><span>Only admin can manage supplier access.</span></div></div>`;
}

function renderEmployees() {
  if (state.role !== 'Admin') return '<div class="empty-state">This section is only available to administrators.</div>';
  const employees = data.employees.filter((employee) => employee.active);
  return `<div class="panel table-panel"><div class="panel-heading"><div><h2>Employee accounts</h2><p>${employees.length} active accounts can sign in to this demo</p></div><span class="status">Admin access</span></div><div class="table-wrap"><table><thead><tr><th>EMPLOYEE</th><th>EMAIL</th><th>ROLE</th><th>ACCOUNT</th><th></th></tr></thead><tbody>${employees.map((employee) => `<tr><td><span class="patient-cell"><span class="avatar avatar-green">${escapeHtml(initialsFor(employee.name))}</span><span class="cell-primary">${escapeHtml(employee.name)}<small class="cell-sub">${escapeHtml(employee.id)}</small></span></span></td><td>${escapeHtml(employee.email)}</td><td>${escapeHtml(employee.role)}</td><td>${statusBadge('Active')}</td><td>${employee.id === state.employeeId ? '<span class="cell-sub">Current account</span>' : `<button class="button button-small button-danger" data-action="remove-employee" data-id="${escapeHtml(employee.id)}">Remove</button>`}</td></tr>`).join('')}</tbody></table></div><div class="table-foot"><span>Demo credentials are stored in this browser only.</span><span>Use sign out to switch accounts.</span></div></div>`;
}

function openEmployeeModal() {
  const roleOptions = ['Admin', 'Pharmacist', 'Technician', 'Cashier'].map((role) => `<option value="${role}">${role}</option>`).join('');
  openModal('Add employee', `${field('Full name', 'name')}${field('Email address', 'email', 'email')}${field('Temporary password', 'password', 'password')}${field('Role', 'role', 'select', '', true, roleOptions)}`, 'Add employee', 'create-employee');
  $('#field-password').minLength = 6;
}

function renderReports() {
  if (state.role === 'Technician') {
    return `<div class="report-grid">${[['Products tracked', data.drugs.length, 'Active product lines'], ['Units on hand', data.drugs.reduce((sum, drug) => sum + drug.onHand, 0), 'Across all batches'], ['Below reorder point', lowStock().length, 'Needs a restock plan']].map(([label, value, foot]) => `<div class="report-stat"><span>${label}</span><strong>${value}</strong><small style="color:#4b835e">${foot}</small></div>`).join('')}</div><section class="panel"><div class="panel-heading"><div><h2>Stock watch</h2><p>Products at or below their reorder threshold</p></div><button class="text-link" data-nav="inventory">Open inventory →</button></div><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>ON HAND</th><th>REORDER AT</th><th>BATCH</th><th>STATUS</th></tr></thead><tbody>${lowStock().map((drug) => `<tr><td class="cell-primary">${escapeHtml(drug.name)}</td><td>${drug.onHand}</td><td>${drug.reorder}</td><td>${escapeHtml(drug.batch)}</td><td>${statusBadge('Low stock')}</td></tr>`).join('') || '<tr><td colspan="5"><div class="empty-state">No products below their reorder point.</div></td></tr>'}</tbody></table></div></section>`;
  }
  if (state.role === 'Cashier') {
    const shiftSales = data.sales.filter((sale) => sale.employeeId === state.employeeId);
    const shiftTotal = shiftSales.reduce((sum, sale) => sum + sale.total, 0);
    const averageSale = shiftSales.length ? shiftTotal / shiftSales.length : 0;
    return `<div class="report-grid">${[['Shift sales', money(shiftTotal), 'Today · Northside'], ['Transactions', shiftSales.length, 'Processed this shift'], ['Basket average', money(averageSale), 'Today']].map(([label, value, foot]) => `<div class="report-stat"><span>${label}</span><strong>${value}</strong><small>${foot}</small></div>`).join('')}</div><section class="panel activity-panel"><div class="panel-heading"><div><h2>Recent shift transactions</h2><p>Payment and invoice activity</p></div><button class="text-link" data-nav="pos">New sale →</button></div><div class="table-wrap"><table><thead><tr><th>INVOICE</th><th>CUSTOMER</th><th>TIME</th><th>ITEMS</th><th>PAYMENT</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>${shiftSales.map((sale) => `<tr><td class="cell-primary">${escapeHtml(sale.id)}</td><td>${escapeHtml(sale.patient)}</td><td>${escapeHtml(sale.time)}</td><td>${sale.items}</td><td>${escapeHtml(sale.payment)}</td><td class="cell-primary">${money(sale.total)}</td><td>${statusBadge(sale.status)}</td></tr>`).join('') || '<tr><td colspan="7"><div class="empty-state">No transactions recorded for this account yet.</div></td></tr>'}</tbody></table></div><div class="table-foot"><span>Shift total ${money(shiftTotal)}</span><span>Demo data</span></div></section>`;
  }
  const total = data.sales.reduce((sum, sale) => sum + sale.total, 0);
  return `<div class="report-grid">${[['Sales today', money(107898), '↑ 12.8% from last Saturday'], ['Transactions', String(data.sales.length + 34), '↑ 8.2% from last Saturday'], ['Inventory value', money(data.drugs.reduce((sum, drug) => sum + drug.onHand * drug.price, 0)), `${lowStock().length} products below threshold`]].map(([label, value, foot]) => `<div class="report-stat"><span>${label}</span><strong>${value}</strong><small>${foot}</small></div>`).join('')}</div><div class="overview-grid"><section class="panel"><div class="panel-heading"><div><h2>Weekly sales</h2><p>Gross revenue by day · current week</p></div><select class="range-select"><option>This week</option><option>Last week</option></select></div><div class="panel-body"><div class="bar-report">${[['Mon',48],['Tue',67],['Wed',54],['Thu',78],['Fri',62],['Sat',91],['Sun',36]].map(([day, height]) => `<div class="bar-report-item"><i style="height:${height}%"></i>${day}</div>`).join('')}</div></div></section><section class="panel"><div class="panel-heading"><div><h2>Sales mix</h2><p>By product category</p></div></div><div class="panel-body"><div class="split-line"><i style="width:44%"></i><i style="width:31%"></i><i style="width:25%"></i></div><div class="split-legend"><span><i class="legend-dot"></i>Prescription 44%</span><span><i class="legend-dot alt"></i>OTC 31%</span><span><i class="legend-dot" style="background:#d2a26e"></i>Other 25%</span></div><div style="margin-top:19px">${[['Prescription sales', money(total * .54)], ['OTC & wellness', money(total * .31)], ['Other', money(total * .15)]].map(([label, value]) => `<div class="summary-line"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></div></section><section class="panel activity-panel"><div class="panel-heading"><div><h2>Inventory watch</h2><p>Products at or below their reorder threshold</p></div><button class="text-link" data-nav="inventory">Open inventory →</button></div><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>ON HAND</th><th>REORDER AT</th><th>SUPPLIER</th><th>STATUS</th></tr></thead><tbody>${lowStock().map((drug) => `<tr><td class="cell-primary">${escapeHtml(drug.name)}</td><td>${drug.onHand}</td><td>${drug.reorder}</td><td>${escapeHtml(drug.supplier)}</td><td>${statusBadge('Low stock')}</td></tr>`).join('') || `<tr><td colspan="5"><div class="empty-state">No low-stock products.</div></td></tr>`}</tbody></table></div></section></div>`;
}

function openModal(title, fields, submitLabel, action, id = '') {
  $('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="dismiss-modal"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-heading"><h2 id="modal-title">${escapeHtml(title)}</h2><button class="modal-close" type="button" data-action="dismiss-modal" aria-label="Close">×</button></div><form id="modal-form" class="modal-form" data-submit-action="${escapeHtml(action)}" data-record-id="${escapeHtml(id)}"><div class="form-grid">${fields}</div><div class="modal-actions"><button class="button" type="button" data-action="dismiss-modal">Cancel</button><button class="button button-primary" type="submit">${escapeHtml(submitLabel)}</button></div></form></section></div>`;
  $('#modal-root input, #modal-root select')?.focus();
}

function field(label, name, type = 'text', value = '', required = true, options = '') {
  const id = `field-${name}`;
  const input = type === 'select' ? `<select id="${id}" name="${name}" ${required ? 'required' : ''}>${options}</select>` : `<input id="${id}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? 'required' : ''}>`;
  return `<div class="form-field"><label for="${id}">${label}</label>${input}</div>`;
}

function openSupplierModal(supplier) {
  const isEdit = Boolean(supplier);
  openModal(isEdit ? 'Edit supplier' : 'Add supplier', `${field('Agency name', 'name', 'text', supplier?.name || '')}${field('Contact name', 'contact', 'text', supplier?.contact || '')}${field('Email', 'email', 'email', supplier?.email || '')}${field('Phone', 'phone', 'tel', supplier?.phone || '')}${field('Payment terms', 'terms', 'text', supplier?.terms || 'Net 30')}`, isEdit ? 'Save changes' : 'Add supplier', isEdit ? 'save-supplier' : 'create-supplier', supplier?.id || '');
}

function openPoModal() {
  const suppliers = data.suppliers.filter((supplier) => supplier.active);
  const supplierField = state.role === 'Admin' ? field('Supplier', 'supplier', 'select', '', false, `<option value="">Not assigned yet</option>${suppliers.map((supplier) => `<option value="${escapeHtml(supplier.name)}">${escapeHtml(supplier.name)}</option>`).join('')}`) : '';
  openModal('New purchase order', `${supplierField}${field('Add product', 'drugId', 'select', '', true, data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}">${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join(''))}${field('Quantity', 'quantity', 'number', '24')}`, 'Create draft', 'create-po');
}

function openPoItemModal(order) {
  openModal(`Add to ${order.id}`, `${field('Product', 'drugId', 'select', '', true, data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}">${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join(''))}${field('Quantity', 'quantity', 'number', '24')}`, 'Add item', 'add-po-item-submit', order.id);
}

function recordPoAudit(order, action, actor = state.role === 'Admin' ? 'Maya Chen' : state.role) {
  if (!order.audit) order.audit = [];
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
  const avatars = { Admin: 'avatar-green', Pharmacist: 'avatar-blue', Technician: 'avatar-orange', Cashier: 'avatar-lime' };
  const accounts = data.employees.filter((employee) => employee.active);
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
  } else if (action === 'add-employee' && role === 'Admin') {
    openEmployeeModal();
  } else if (action === 'remove-employee' && role === 'Admin') {
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
    openModal('Receive stock', `${field('Product', 'drugId', 'select', '', true, data.drugs.map((drug) => `<option value="${escapeHtml(drug.id)}">${escapeHtml(drug.name)} · ${drug.onHand} on hand</option>`).join(''))}${field('Quantity received', 'quantity', 'number', '24')}${field('Batch number', 'batch', 'text', '')}${field('Expiry date', 'expiry', 'date', '')}`, 'Update inventory', 'receive-stock-submit');
  } else if (action === 'receive-one') {
    const drug = drugFor(id);
    openModal(`Receive ${drug?.name || 'stock'}`, `${field('Quantity received', 'quantity', 'number', '24')}${field('Batch number', 'batch', 'text', drug?.batch || '')}${field('Expiry date', 'expiry', 'date', '')}`, 'Update inventory', 'receive-one-submit', id);
  } else if (action === 'add-patient' && ['Admin', 'Pharmacist', 'Technician'].includes(role)) {
    openModal('Add patient', `${field('Full name', 'name')}${field('Age', 'age', 'number', '30')}${field('Phone', 'phone', 'tel')}${field('Allergies', 'allergies', 'text', 'None recorded', false)}`, 'Add patient', 'create-patient');
  } else if (action === 'add-doctor' && ['Admin', 'Pharmacist'].includes(role)) {
    openModal('Add doctor', `${field('Full name', 'name')}${field('Specialty', 'specialty')}${field('Phone', 'phone', 'tel')}${field('Email', 'email', 'email')}`, 'Add doctor', 'create-doctor');
  } else if (action === 'add-supplier' && role === 'Admin') {
    openSupplierModal();
  } else if (action === 'edit-supplier' && role === 'Admin') {
    openSupplierModal(data.suppliers.find((supplier) => supplier.id === id));
  } else if (action === 'deactivate-supplier' && role === 'Admin') {
    const supplier = data.suppliers.find((item) => item.id === id);
    if (supplier && confirm(`Deactivate ${supplier.name}? Existing purchase orders will remain unchanged.`)) {
      supplier.active = false;
      save(); render(); notify('Supplier deactivated.');
    }
  } else if (action === 'new-po' && ['Admin', 'Pharmacist', 'Technician'].includes(role)) {
    openPoModal();
  } else if (action === 'add-po-item') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (order?.status === 'Draft' && ['Admin', 'Pharmacist', 'Technician'].includes(role)) openPoItemModal(order);
  } else if (action === 'finalize-po' && role === 'Admin') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    openModal(`${order.status === 'Draft' ? 'Review' : 'Approve'} ${order.id}`, `${field('Supplier', 'supplier', 'select', order.supplier, true, `<option value="">Choose supplier</option>${data.suppliers.filter((supplier) => supplier.active).map((supplier) => `<option value="${escapeHtml(supplier.name)}" ${supplier.name === order.supplier ? 'selected' : ''}>${escapeHtml(supplier.name)}</option>`).join('')}`)}<div class="form-field full"><label>Order summary</label><div class="summary-line"><span>${order.items.length} products · ${order.items.reduce((sum, item) => sum + item.quantity, 0)} units</span><strong>${money(order.items.reduce((sum, item) => sum + item.quantity * item.cost, 0))}</strong></div></div>`, 'Approve & send', 'send-po', id);
  } else if (action === 'view-audit' && role === 'Admin') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    const audit = order.audit?.length ? order.audit : [{ action: `Created order ${order.id}`, actor: order.createdBy || 'Pharmacy team', at: new Date(order.created).toISOString() }];
    openModal(`${order.id} · audit trail`, `<div class="form-field full">${audit.slice().reverse().map((entry) => `<div class="summary-line"><span><strong>${escapeHtml(entry.action)}</strong><small class="cell-sub">${escapeHtml(entry.actor)}</small></span><time>${escapeHtml(new Date(entry.at).toLocaleString())}</time></div>`).join('')}</div>`, 'Close', 'view-only');
  } else if (action === 'email-po' && role === 'Admin') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    const supplier = data.suppliers.find((item) => item.name === order?.supplier);
    if (!order || !supplier) return notify('Assign an active supplier before emailing this order.');
    const lines = order.items.map((item) => `${item.name} — ${item.quantity} units`).join('\n');
    window.location.href = `mailto:${encodeURIComponent(supplier.email)}?subject=${encodeURIComponent(`Purchase order ${order.id}`)}&body=${encodeURIComponent(`Hello ${supplier.contact},\n\nPlease find our order ${order.id}:\n${lines}\n\nEstimated total: ${money(order.items.reduce((sum, item) => sum + item.quantity * item.cost, 0))}\n\nThank you,\nNorthside Pharmacy`)}`;
    notify('Your email app will open with the order details.');
  } else if (action === 'print-po' && role === 'Admin') {
    const order = data.purchaseOrders.find((item) => item.id === id);
    if (!order) return;
    state.printOrder = id;
    $('#content').innerHTML = `<div class="panel"><div class="panel-heading"><h2>Purchase order ${escapeHtml(order.id)}</h2><button class="button" data-action="print-now">Print / save PDF</button></div><div class="panel-body"><p>Supplier: <strong>${escapeHtml(order.supplier)}</strong></p><p>Created: ${escapeHtml(order.created)} · Created by ${escapeHtml(order.createdBy || 'Pharmacy team')}</p><div class="table-wrap"><table><thead><tr><th>PRODUCT</th><th>QUANTITY</th><th>UNIT COST</th><th>LINE TOTAL</th></tr></thead><tbody>${order.items.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${item.quantity}</td><td>${money(item.cost)}</td><td>${money(item.quantity * item.cost)}</td></tr>`).join('')}</tbody></table></div><div class="summary-line summary-total"><strong>Estimated total</strong><strong>${money(order.items.reduce((sum, item) => sum + item.cost * item.quantity, 0))}</strong></div></div></div>`;
  } else if (action === 'print-now') {
    window.print();
  } else if (action === 'add-cart') {
    if (!['Admin', 'Cashier'].includes(role)) return notify('Your role cannot process a sale.');
    const drug = drugFor(id);
    if (!drug || drug.onHand < 1) return notify('This product is out of stock.');
    const line = data.cart.find((item) => item.drugId === id);
    if (line) {
      if (line.quantity >= drug.onHand) return notify('There is not enough stock for that quantity.');
      line.quantity += 1;
    } else data.cart.push({ drugId: id, quantity: 1 });
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
    data.cart = []; render();
  } else if (action === 'checkout') {
    if (!data.cart.length) return;
    if (!['Admin', 'Cashier'].includes(role)) return notify('Your role cannot process a sale.');
    const invalid = data.cart.find((line) => !drugFor(line.drugId) || drugFor(line.drugId).onHand < line.quantity);
    if (invalid) return notify('Stock changed. Review the basket and try again.');
    const subtotal = data.cart.reduce((sum, line) => sum + drugFor(line.drugId).price * line.quantity, 0);
    const total = subtotal * 1.0825;
    data.cart.forEach((line) => { drugFor(line.drugId).onHand -= line.quantity; });
    const sale = { id: `INV-${8292 + data.sales.length - 4}`, patient: $('#pos-patient')?.value || 'Walk-in customer', time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }), items: data.cart.reduce((sum, line) => sum + line.quantity, 0), total, payment: $('#pos-payment')?.value || 'Card', status: 'Paid', employeeId: state.employeeId };
    data.sales.unshift(sale); data.cart = []; save(); render(); notify(`Sale ${sale.id} complete. Inventory updated.`);
  } else if (action === 'approve-rx' && ['Admin', 'Pharmacist'].includes(role)) {
    const rx = data.prescriptions.find((item) => item.id === id);
    if (!rx || rx.status !== 'Pending review') return;
    if (rx.allergy && !confirm(`${rx.allergy}. Confirm this prescription has been clinically checked and approve?`)) return;
    rx.status = 'Approved'; save(); render(); notify(`${rx.id} approved for dispensing.`);
  } else if (action === 'reject-rx' && ['Admin', 'Pharmacist'].includes(role)) {
    const rx = data.prescriptions.find((item) => item.id === id);
    if (!rx || rx.status !== 'Pending review') return;
    rx.status = 'Rejected'; save(); render(); notify(`${rx.id} rejected.`);
  } else if (action === 'dispense-rx' && ['Admin', 'Pharmacist'].includes(role)) {
    const rx = data.prescriptions.find((item) => item.id === id);
    if (!rx || rx.status !== 'Approved') return;
    rx.status = 'Dispensed'; save(); render(); notify(`${rx.id} marked as dispensed.`);
  } else if (action === 'patient-history') {
    const patient = data.patients.find((item) => item.id === id);
    const history = data.prescriptions.filter((item) => item.patientId === id);
    openModal(`${patient?.name || 'Patient'} · visit history`, `<div class="form-field full"><label>Known allergies</label><div class="summary-line"><span>${escapeHtml(patient?.allergies || 'None recorded')}</span></div></div><div class="form-field full"><label>Prescription history</label>${history.length ? history.map((rx) => `<div class="summary-line"><span><strong>${escapeHtml(rx.medication)}</strong><small class="cell-sub">${escapeHtml(rx.doctor)} · ${escapeHtml(rx.received)}</small></span>${statusBadge(rx.status)}</div>`).join('') : '<p class="visit-note">No prescription history recorded.</p>'}</div>`, 'Close', 'view-only');
  }
}

function handleFormSubmit(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  const action = form.dataset.submitAction;
  const id = form.dataset.recordId;
  if (action === 'create-employee' && state.role === 'Admin') {
    if (data.employees.some((employee) => employee.email.toLowerCase() === values.email.toLowerCase())) return notify('An account already uses that email address.');
    if (values.password.length < 6) return notify('Use a temporary password with at least 6 characters.');
    data.employees.unshift({ id: `EMP-${Date.now()}`, name: values.name, email: values.email.toLowerCase(), password: values.password, role: values.role, active: true });
    state.view = 'employees';
  } else if (action === 'create-patient') {
    data.patients.unshift({ id: `PT-${2050 + data.patients.length}`, ...values, age: Number(values.age), lastVisit: 'No visits yet', initials: initialsFor(values.name) });
    state.view = 'patients';
  } else if (action === 'create-doctor') {
    data.doctors.unshift({ id: `DR-${String(13 + data.doctors.length).padStart(3, '0')}`, ...values, referrals: 0 });
    state.view = 'doctors';
  } else if (action === 'create-supplier' || action === 'save-supplier') {
    if (action === 'save-supplier') Object.assign(data.suppliers.find((supplier) => supplier.id === id), values);
    else data.suppliers.unshift({ id: `SU-${String(22 + data.suppliers.length).padStart(3, '0')}`, ...values, active: true });
    state.view = 'suppliers';
  } else if (action === 'receive-stock-submit' || action === 'receive-one-submit') {
    const drug = drugFor(action === 'receive-one-submit' ? id : values.drugId);
    if (!drug) return;
    const quantity = Math.floor(Number(values.quantity));
    if (quantity < 1) return notify('Enter a quantity greater than zero.');
    drug.onHand += quantity;
    if (values.batch) drug.batch = values.batch;
    if (values.expiry) drug.expiry = new Date(`${values.expiry}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    state.view = 'inventory';
  } else if (action === 'create-po') {
    const drug = drugFor(values.drugId);
    const quantity = Math.floor(Number(values.quantity));
    if (!drug || quantity < 1) return notify('Choose a product and quantity greater than zero.');
    const item = { drugId: drug.id, name: drug.name, quantity, cost: Math.round(drug.price * .48 * 100) / 100 };
    const order = { id: `PO-${1043 + data.purchaseOrders.length - 2}`, supplier: state.role === 'Admin' ? values.supplier : '', status: 'Draft', created: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), items: [item], createdBy: state.role === 'Admin' ? 'Maya Chen' : state.role, audit: [] };
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
    order.supplier = values.supplier;
    order.status = 'Sent';
    order.approvedBy = 'Maya Chen';
    order.approvedAt = new Date().toISOString();
    recordPoAudit(order, `Approved and sent to ${values.supplier}`, 'Maya Chen');
    state.view = 'purchase-orders';
  } else if (action === 'view-only') {
    $('#modal-root').innerHTML = '';
    return;
  }
  save();
  $('#modal-root').innerHTML = '';
  render();
  const messages = { 'create-employee': 'Employee account created.', 'create-patient': 'Patient added.', 'create-doctor': 'Doctor added.', 'create-supplier': 'Supplier added.', 'save-supplier': 'Supplier updated.', 'receive-stock-submit': 'Inventory updated.', 'receive-one-submit': 'Inventory updated.', 'create-po': 'Purchase order draft created.', 'add-po-item-submit': 'Product added to the draft.', 'send-po': 'Purchase order approved and marked sent.' };
  notify(messages[action] || 'Changes saved.');
}

function applyInventoryFilters() {
  const rows = $('#inventory-rows');
  if (!rows) return;
  const query = ($('#inventory-search')?.value || '').toLowerCase();
  const filter = $('#inventory-filter')?.value || 'All stock';
  $$('tr', rows).forEach((row) => {
    const matchesQuery = row.dataset.search.includes(query);
    const matchesStock = filter === 'All stock' || (filter === 'Low stock' ? row.dataset.stock === 'low' : row.dataset.stock === 'in');
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
    if (permissions[state.role].includes(view)) { state.view = view; render(); }
    else notify('This view is not available for your role.');
    return;
  }
  const actionButton = event.target.closest('[data-action]');
  if (actionButton) {
    if (actionButton.dataset.action === 'dismiss-modal' && actionButton.classList.contains('modal-backdrop')) {
      if (event.target === actionButton) $('#modal-root').innerHTML = '';
      return;
    }
    if (actionButton.dataset.action === 'dismiss-modal' && actionButton.closest('.modal')) { $('#modal-root').innerHTML = ''; return; }
    handleAction(actionButton.dataset.action, actionButton.dataset.id, actionButton);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'login-form') {
    event.preventDefault();
    const email = $('#login-email').value.trim().toLowerCase();
    const password = $('#login-password').value;
    const employee = data.employees.find((item) => item.active && item.email.toLowerCase() === email && item.password === password);
    if (!employee) {
      $('#login-error').textContent = 'That email and password do not match an active account.';
      $('#login-error').hidden = false;
      return;
    }
    signIn(employee);
  } else if (event.target.id === 'modal-form') {
    event.preventDefault();
    handleFormSubmit(event.target);
  }
});

document.addEventListener('input', (event) => {
  const input = event.target;
  if (input.id === 'inventory-search') {
    state.inventoryQuery = input.value;
    applyInventoryFilters();
  } else if (input.id === 'patient-search' || input.id === 'doctor-search' || input.id === 'supplier-search') {
    const rowSelector = input.id === 'patient-search' ? '.patient-table-row' : 'tr[data-search]';
    if (input.id === 'patient-search') {
      state.patientQuery = input.value;
      $('#content').innerHTML = renderPatients();
      $('#patient-search').focus();
      $('#patient-search').setSelectionRange(input.value.length, input.value.length);
    } else {
      const query = input.value.toLowerCase();
      if (input.id === 'doctor-search') state.doctorQuery = input.value;
      if (input.id === 'supplier-search') state.supplierQuery = input.value;
      $$(rowSelector, $('#content')).forEach((row) => { row.hidden = !row.dataset.search.includes(query); });
    }
  } else if (input.id === 'pos-search') {
    const query = input.value.toLowerCase();
    $$('.pos-product').forEach((button) => { button.hidden = !button.textContent.toLowerCase().includes(query); });
  } else if (input.id === 'global-search') {
    state.globalQuery = input.value.trim().toLowerCase();
    if (state.globalQuery.length < 2) return;
    const patient = permissions[state.role].includes('patients') ? data.patients.find((item) => `${item.name} ${item.id}`.toLowerCase().includes(state.globalQuery)) : null;
    const drug = data.drugs.find((item) => `${item.name} ${item.generic}`.toLowerCase().includes(state.globalQuery));
    if (patient) { state.view = 'patients'; state.patientQuery = patient.name; render(); $('#patient-search')?.focus(); }
    else if (drug && permissions[state.role].includes('inventory')) { state.view = 'inventory'; state.inventoryQuery = drug.name; render(); $('#inventory-search')?.focus(); }
    else if (drug && permissions[state.role].includes('pos')) { state.view = 'pos'; render(); const search = $('#pos-search'); search.value = drug.name; search.dispatchEvent(new Event('input', { bubbles: true })); search.focus(); }
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target.id === 'inventory-filter') {
    applyInventoryFilters();
  } else if (target.id === 'prescription-filter') {
    state.prescriptionFilter = target.value; render();
  } else if (target.id === 'po-filter') {
    state.poFilter = target.value; render();
  }
});

$('#mobile-menu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#notifications-button').addEventListener('click', () => {
  if (['Admin', 'Pharmacist'].includes(state.role)) notify(`${pendingCount()} prescriptions and ${lowStock().length} low-stock products need attention.`);
  else if (state.role === 'Technician') notify(`${lowStock().length} products are at or below their reorder point.`);
  else notify('No new shift notifications.');
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault(); $('#global-search').focus();
  }
  if (event.key === 'Escape') $('#modal-root').innerHTML = '';
});

renderLoginAccounts();
$('#login-email').focus();