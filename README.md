# Fieldnote Pharmacy

A responsive, dependency-free pharmacy operations demo. Open `index.html` in a browser to explore the role-aware workspace.

## Demo workflows

- Switch between Admin, Pharmacist, Technician, and Cashier from the role selector to preview navigation and action permissions.
- Build and charge a cashier sale; stock is decremented and the invoice appears in recent transactions.
- Receive stock, filter inventory, review prescriptions, and create purchase-order drafts.
- As Admin, manage suppliers, approve and dispatch purchase orders, inspect the audit trail, print an order, or open an email draft.
- Add patients and doctors, inspect patient prescription history, and review role-scoped reports.

Demo changes are stored in this browser's local storage. Use the browser console to clear the demo data with `localStorage.removeItem('fieldnote-pharmacy-demo-v1')` and reload.

This is a frontend prototype, not a production pharmacy system. It has no authentication, server-side authorization, shared database, payment gateway, clinical decision support, or direct PDF/email service. The role selector is for preview only; print uses the browser's print dialog and supplier email opens the configured mail app.
