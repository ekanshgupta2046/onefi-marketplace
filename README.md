# 1Fi Marketplace

1Fi Marketplace section built into the Shop page, matching the existing app's structure and style.

## Setup

​```
npm install
npm run dev
​```

Visit `http://localhost:3000` (redirects to `/shop`).

## Stack

Next.js (App Router) + TypeScript + Tailwind. Confirmed by pulling the 1Fi Android APK and inspecting it: it's a Capacitor shell with no native RN/Flutter code, loading `app.1fi.in` at runtime. That site is itself a Next.js app (confirmed via the `next-size-adjust` meta tag it serves). Brand color
`#712CDC` was taken directly from that page's `theme-color` meta tag.

## Routes

- `/shop` — 3-tab Shop page. Top Brands / Nearby Stores are blank per the assignment; 1Fi Marketplace is fully implemented.
- `/products/[slug]` — product detail: variant selector, EMI plan selection, proceed CTA.

## Data

No real backend, so `src/lib/productService.ts` returns Promises over mock data (`src/lib/mockData.ts`) with simulated latency. Components only call the service functions, never the mock data directly, so swapping in a real API later only touches this one file.

Shape:

​```json
{
  "id": "p1",
  "slug": "iphone-17-pro",
  "name": "iPhone 17 Pro",
  "brand": "Apple",
  "variants": [
    {
      "id": "p1-v1",
      "label": "256GB Silver",
      "mrp": 134900,
      "price": 127400,
      "imageUrl": "...",
      "attributes": { "storage": "256GB", "color": "Silver" },
      "emiPlans": [
        { "id": "emi-3", "tenureMonths": 3, "monthlyAmount": 44967, "interestRate": 0, "cashbackAmount": 7500 }
      ]
    }
  ]
}
​```

3 products (iPhone 17 Pro, Samsung Galaxy S25, OnePlus 15R), 2-3 variants each, each variant with its own EMI plan ladder (0% up to 24 months, 10.5% beyond, per the reference material). Product images were sourced from Snapmint's catalog (the reference material) and are stored locally under `public/products`.

## Structure

- `src/lib/mockData.ts` — mock data + types
- `src/lib/productService.ts` — async data access layer
- `src/components/` — `Button`, `ProductCard`, `ProductImage`,
  `EmiPlanOption`, `StateViews` (loading/error/empty)
- `src/components/shop/` — `ShopTabs`, `MarketplaceTab`, `ShopBanner`
- `src/app/shop/page.tsx` — Shop page
- `src/app/products/[slug]/` — product detail page

## Notes

- Money stored as whole rupees, no fractional paise.
- Proceed CTA navigates back to `/shop` — no real checkout in scope.