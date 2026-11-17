# Aura Spaces – Current Build

A snapshot of the website as it currently exists in this project.

## How to run locally

From the `Aura_spaces` folder:

```
npm install
node node_modules/vite/bin/vite.js
```

Then open the address Vite prints (currently `http://localhost:3001/`).

Notes:
- `npm run dev` may fail with a "Permission denied" error on some machines. Running Vite through `node` as shown above works around it.
- Stop the server with `Ctrl + C`.

## Tech stack

- React 18 + TypeScript
- Vite 6 (build tool and dev server), with the SWC React plugin
- Tailwind-style utility classes plus custom CSS in `src/styles/` and `src/index.css`
- Radix UI and shadcn/ui-style components in `src/components/ui/`
- `motion` for animations
- `react-router-dom` (HashRouter) for page routing
- `lucide-react` for icons
- Images imported from `src/assets/` through `figma:asset/...` aliases defined in `vite.config.ts`

## Pages and routes

| Route | Component | Status |
|---|---|---|
| `/` (`#/`) | `AuraHome` in `src/App.tsx` | Working. Single-page homepage with sections listed below. |
| `/price-estimator` (`#/price-estimator`) | `KitchenEstimatorApp` in `src/components/kitchen-estimator/` | Working. 7-step kitchen price estimator. |

### Homepage sections (top to bottom)

1. **Navigation bar** – fixed, collapses on scroll. Links: About Us, Price Estimator, Aura Decor, Contact us.
2. **Hero** – "aura spaces" title, tagline, "Book consultation" button, kitchen image with badges.
3. **Trust badges** – Smart-ready interiors, Budget-friendly by design, Designed for UK homes.
4. **Interiors Designed for Modern UK Living** – three cards: Kitchens, Bedrooms, Living Rooms. Each has an image upload button in the code.
5. **Price Estimator teaser** – `PriceEstimator` component (`src/components/PriceEstimator.tsx`).
6. **What Makes Us Different** – four cards: Smart-ready by design, Calm functional layouts, Energy-conscious choices, Premium feel, fair pricing.
7. **Popular Kitchen Styles**, **Popular Bedroom Styles**, **Popular Living Room Styles** – horizontal scrolling image cards.
8. **About Us** – company description and team photo.
9. **Aura Decor** – three cards (Soft Furnishings, Wall & Accent Décor, Lighting & Decorative Objects) and an "Explore Collection" button.
10. **Get In Touch** – contact details and a "Request Consultation" form.
11. **Footer** – logo, links, copyright and company registration text.

### Contact form

- Sends the form data as JSON via `POST` to a Google Apps Script endpoint (set in `ENDPOINT` in `src/App.tsx`).
- Includes a hidden honeypot field (`company`) to block spam.
- Phone field expects a UK number and auto-formats it with `+44`.
- After submitting, it shows a "Thank You!" message.

## Price Estimator (`/price-estimator`)

Pricing rules live in `src/components/kitchen-estimator/pricing.ts`.

### Kitchen size (unit-based, fixed prices)

| Size | Units | Area | Layout | Cabinet price |
|---|---|---|---|---|
| Small | 8 | 10 m² | 1 Wall | £959 |
| Medium | 12 | 15 m² | 2 Walls | £1,903 |
| Large | 16 | 20 m² | 3 Walls | £2,916 |
| Extra Large | 20 | 30 m² | 3 Walls + Island | £3,352 |

The older tier-based (Essential / Signature / Luxe per-metre) pricing is no longer used for the cabinet cost. The `collectionTier` type and labels still exist in the file.

### Calculation

- `cabinetCost` = price for the selected kitchen size
- `worktops` = worktop range × (units ÷ 8)
- `appliances` = selected appliance pack range (if chosen)
- `sinkTap` = selected sink/tap range
- `supply` = cabinets + worktops + appliances + sink/tap
- `installation` = 0 for supply only, otherwise a percentage of supply (20% professional, 28% full project)
- `subtotal` = supply + installation
- `VAT` = 20% of subtotal
- `total` = subtotal + VAT, rounded to the nearest £50

### Steps

1. Collection (Essential / Signature / Luxe)
2. Size (Small / Medium / Large / Extra Large)
3. Worktops
4. Sink & Tap
5. Appliances
6. Installation
7. Estimate

A summary panel stays visible while going through the steps. On mobile it becomes a drawer.

## Known issues / things to tidy up

- **Dead links on the homepage:** the Kitchens, Bedrooms and Living Rooms cards and "View all" links point to `/kitchens`, `/bedrooms` and `/living-rooms`. These routes do not exist in `src/App.tsx`, so they will not show a page.
- **Missing anchor:** some links point to `#services`, which does not exist on the page.
- **Duplicate pricing file:** `src/components/pricing.ts` is an older copy. The estimator uses `src/components/kitchen-estimator/pricing.ts`.
- **Image upload on cards:** the Kitchens and Bedrooms cards have upload inputs, but there is no visible button to trigger them.
- **Copyright year:** the footer says 2025.
- **Unused build files:** `build/` and `docs/` are older compiled copies of the site. `docs/` is used for GitHub Pages (`CNAME` file present).
- **npm audit:** `npm install` reports 8 high-severity vulnerabilities in dependencies. Not fixed yet.
- **Unsplash images:** some images load from `images.unsplash.com`, so they need an internet connection.
