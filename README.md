# Ham-SaAh Rx

A responsive, dependency-free pharmacy operations demo. Open `index.html` in a browser to sign in to the role-aware workspace. All displayed prices use INR.

## Drug reference and inventory

The inventory's **Drug reference** search is built from the uploaded CDSCO approval workbook and PMBI tender PDF. It includes medicine names, available strengths/specifications, indications, and tender pack details. It deliberately excludes source serial numbers, drug codes, approval dates, and tender requirement quantities. These reference documents do not provide pharmacy stock, batch/expiry data, or retail prices.

To rebuild `drug-reference.js` after replacing either source file, install the parser dependencies and run:

```sh
python3 -m pip install -r scripts/requirements-drug-reference.txt
python3 scripts/build_drug_reference.py
```

Adding a reference item to inventory requires a locally chosen category, reorder threshold, and actual INR unit price. New items start at zero stock and are not available for sale until the first stock receipt includes its batch number and expiry date. The reference catalog itself is local and searchable; it does not claim source tender quantities as pharmacy stock.

## Optional pharmacy price refresh

The app can use a small Node.js sidecar to refresh configured products from direct product pages. It does not scrape search pages: 1mg and PharmEasy disallow their search paths in `robots.txt`. Only HTTPS URLs on 1mg, PharmEasy, Netmeds, or Apollo Pharmacy are accepted; each source's `robots.txt` is checked before fetching. Prices are applied only when the page contains a matching Product JSON-LD offer in INR that is not marked out of stock. Unverified products keep their existing local price.

Use Node.js 20 or newer:

1. Copy `.env.example` to `.env` and replace the example URL with the direct product page for that generic. Repeat entries for products that have verified source pages.
2. Run `PORT=8001 node --env-file=.env server.js` and open `http://localhost:8001` instead of opening `index.html` as a file. Choose another free port if needed.
3. Run `node --test server.test.js` to test the endpoint and parser.

The server-side refresh is optional. The original curated catalog remains available if the server is stopped or a price cannot be verified. This demo server has no user authentication; do not expose it publicly without adding appropriate access controls, rate limits, and product-price review.

## Company profiles

Sign in as Superadmin to create, rename, and switch company profiles. Northside Pharmacy is the original profile; every additional profile starts with its own Admin account and empty employees, patients, doctors, suppliers, inventory, prescriptions, orders, and sales. Profile data is stored separately in this browser's local storage. Company Admins manage their own records, including patient and doctor edits; Superadmin manages all company profiles.

Superadmin demo login: `superadmin@hamsaahrx.demo` / `super123`.

On screens narrower than 800px, the app displays a dismissible notice that tables and detailed content may require horizontal scrolling and suggests a tablet or desktop for the clearest view.

## Page previews

| Sign in | Overview |
| --- | --- |
| ![Ham-SaAh Rx sign-in](screenshots/login.png) | ![Ham-SaAh Rx overview dashboard](screenshots/dashboard.png) |

| Point of sale | Inventory |
| --- | --- |
| ![Point of sale](screenshots/pos.png) | ![Inventory](screenshots/inventory.png) |

| Prescription review | Purchase orders |
| --- | --- |
| ![Prescription review](screenshots/prescriptions.png) | ![Purchase orders](screenshots/purchase-orders.png) |

## Demo workflows

- Sign in as one of the four demo employees below to preview role-specific navigation and actions.
- Build and charge a cashier sale; stock is decremented and the invoice appears in recent transactions.
- Receive stock, filter inventory, review prescriptions, and create purchase-order drafts.
- As Admin, manage suppliers and employee accounts, approve and dispatch purchase orders, inspect the audit trail, print an order, or open an email draft.
- Add patients and doctors, inspect patient prescription history, and review role-scoped reports.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | `maya@hamsaahrx.demo` | `maya123` |
| Pharmacist | `asha@hamsaahrx.demo` | `asha123` |
| Technician | `leo@hamsaahrx.demo` | `leo123` |
| Cashier | `nia@hamsaahrx.demo` | `nia123` |

Demo changes are stored in this browser's local storage. Use the browser console to clear the demo data with `localStorage.removeItem('hamsaahrx-pharmacy-demo-v1')` and reload. Existing Fieldnote demo data is migrated automatically.

This is a frontend prototype, not a production pharmacy system. Login credentials and employee records live in browser storage; there is no server-side authentication or authorization, shared database, payment gateway, or clinical decision support. Print uses the browser's print dialog and supplier email opens the configured mail app. Do not use real patient data.
