# AuroraShop — E-Commerce Platform

A production-minded, single-page e-commerce application for browsing, searching, comparing, and buying products. Built with **React 19 + TypeScript**, a real public product API, a **virtualized** product grid, a **multi-step checkout**, wishlist & compare, persistent cart, full reviews/gallery, dark/light theming, and URL-driven filters.

> **Assignment:** SDE-2 Frontend Challenge #2 — _Build a production-ready e-commerce platform._

---

## Table of Contents

- [Highlights](#highlights)
- [Live Data Source](#live-data-source)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture & Project Structure](#architecture--project-structure)
- [Design System](#design-system)
- [Engineering Decisions](#engineering-decisions)
- [Testing](#testing)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [What I Would Do Differently With More Time](#what-i-would-do-differently-with-more-time)

---

## Highlights

- 🛒 **Complete purchase journey** — browse → product detail → cart → **3-step validated checkout** → order confirmation, with the cart cleared and the order persisted. **Buy Now** shortcuts straight to checkout from any card or the detail page.
- ⚡ **Windowed product grid** — only the rows near the viewport are mounted (via `@tanstack/react-virtual`), so scrolling through thousands of products keeps the DOM tiny. Infinite loading is driven by the virtualizer's own range.
- 🖼️ **Galleries everywhere + optimized images** — product cards double as a mini gallery (hover the dots to preview `images[]`), the detail page has a full gallery, and every image lazy-loads, async-decodes, fades in over a shimmer, and degrades gracefully on error.
- ❤️ **Wishlist & 🔬 compare** — persisted, with a live compare tray and a side-by-side comparison table.
- ⭐ **Rich product pages** — multi-image gallery + real customer reviews with a rating distribution.
- 🧠 **Separated state** — server state (TanStack Query) vs. focused client stores (cart / wishlist / compare / orders), each memoized so unrelated updates don't cascade.
- ✅ **Tested & typed** — 24 unit tests (Vitest + Testing Library), strict TypeScript, zero lint errors, error boundary, and accessible components.

---

## Live Data Source

The app uses the free, public **[DummyJSON](https://dummyjson.com)** API — no backend or API key required. It provides realistic product data (title, brand, price, discount, rating, reviews, images, stock, shipping/warranty/return info) plus endpoints for listing, single-product lookup, categories, category filtering, search, sorting, and pagination.

| Concern                     | Endpoint                       |
| --------------------------- | ------------------------------ |
| Product listing (paginated) | `GET /products`                |
| Single product              | `GET /products/:id`            |
| Categories                  | `GET /products/categories`     |
| Filter by category          | `GET /products/category/:slug` |
| Search                      | `GET /products/search?q=`      |

---

## Tech Stack

| Area          | Choice                             | Why                                                                          |
| ------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| Framework     | **React 19** + **TypeScript**      | Type safety and modern React (with the React Compiler for auto-memoization). |
| Build tool    | **Vite**                           | Fast dev server and optimized, code-split production builds.                  |
| Styling       | **Tailwind CSS v4**                | Utility-first, themeable via an OKLCH token system.                          |
| UI primitives | **Radix UI / shadcn**              | Accessible primitives (dialog, dropdown, select, breadcrumb, …).            |
| Server state  | **TanStack Query v5**              | Caching, background refetch, and **infinite queries** out of the box.        |
| Virtualization| **@tanstack/react-virtual**        | Window virtualization for the product grid.                                  |
| Forms         | **React Hook Form** + **Zod**      | Performant, fully-validated multi-step checkout (incl. Luhn card check).      |
| Routing       | **React Router**                   | Declarative routes with a shared layout and lazy-loaded pages.               |
| Client state  | **React Context + localStorage**   | Focused stores (cart/wishlist/compare/orders) with cross-tab sync.           |
| HTTP          | **Axios**                          | A single configured instance with a response interceptor.                    |
| Testing       | **Vitest** + **Testing Library**   | Unit tests for pricing, discounts, validation, and the cart store.           |
| Notifications | **Sonner**                         | Toasts for cart/wishlist feedback.                                          |
| Delight       | **canvas-confetti** + **Motion**   | Confetti + animated check on the order-confirmation screen.                  |
| Icons         | **lucide-react**                   | Consistent icon set.                                                         |

---

## Features

### Browsing & discovery

- **Virtualized product grid** — responsive 1→5 columns; only on-screen rows are in the DOM. Infinite loading triggers from the virtualizer's range (no extra observer).
- **Product cards as mini galleries** — cards render `images[]` with dot indicators; hovering or focusing a dot previews each image, plus **Buy Now** and a quick add-to-cart action.
- **Global search** (⌘K / Ctrl-K) — debounced, reflected in the URL, and navigates back to the listing from anywhere.
- **Category filtering** via an accessible, scrollable pill bar.
- **Sorting** by title / price / rating / discount / stock with an asc/desc toggle and a clear-filters action.
- **URL-driven state** — category, search, and sort live in the query string, so views are **shareable, bookmarkable, and survive refresh / back-forward** navigation.

### Product detail

- **Image gallery** across the full `images[]` array with thumbnail navigation.
- **Reviews** — real customer reviews with an aggregate score and a 5→1 star distribution.
- Full data surface: brand, tags, availability, shipping, warranty, return policy, and minimum order quantity.
- **Buy Now** (straight to checkout) plus add to cart with a **stock-aware** quantity stepper, and wishlist & compare toggles.

### Cart, wishlist & compare

- **Cart** — merges quantities (no duplicate lines), enforces stock caps, removes a line at qty 0, and persists to `localStorage` with **cross-tab sync**.
- **Order summary** with a centralized pricing model — subtotal, discount, tax, and **free shipping over $100** (with a "add $X more" nudge).
- **Wishlist** — persisted, with its own page and header badge.
- **Compare** — a floating tray (up to 4 products) and a side-by-side attribute table.

### Checkout

- **3-step flow** — Shipping → Payment → Review — with a progress indicator.
- **Full validation** via Zod: email, phone, postal code, and a **Luhn-checked** card number with expiry/CVV rules.
- On "Place order": simulates a request, **persists the order**, **clears the cart**, and routes to a confirmation screen with an order ID, estimated delivery window, itemized totals, and confetti.

### UX / quality

- **Dark / Light / System** theme, persisted.
- **Optimized images** — a shared `ProductImage` component lazy-loads (and `fetchPriority`-hints the hero), async-decodes, reserves layout space to avoid CLS, fades in over a shimmer placeholder, and falls back to an icon if a URL fails.
- **Error boundary** + explicit **error states** with retry for failed fetches (not just empty states).
- **Empty states** for cart, wishlist, compare, and no-results.
- **Accessibility** — semantic roles, `aria-*` labels, keyboard-operable controls, labelled form fields, and screen-reader-friendly rating/quantity widgets.
- Custom **404** and route-level code splitting.

---

## Architecture & Project Structure

The project is **feature-first**: cross-cutting building blocks live at the top level, product-specific logic under `features/products`, and page-specific composition under `pages`.

```
src/
├── api/                      # Axios instance, config, typed HTTP helpers, query client
├── components/
│   ├── search/               # Search input, category pills, cart & wishlist buttons
│   ├── ui/                   # Radix/shadcn primitives
│   ├── error-boundary.tsx    # App-level crash recovery
│   └── error-state.tsx       # Reusable retryable error UI
├── contexts/
│   ├── cart/                 # Cart store (context + provider) — merge/stock logic
│   ├── wishlist/             # Wishlist store
│   ├── compare/              # Compare store (max 4)
│   ├── orders/               # Placed-orders store
│   ├── store-provider.tsx    # Composes the client stores
│   └── theme-provider.tsx    # Dark/light/system theme
├── features/
│   └── products/             # Product domain
│       ├── api/              # Endpoints + query keys
│       ├── components/       # Card, virtualized grid, gallery, optimized image, reviews, compare bar…
│       ├── hooks/            # useProducts (infinite), useGetProduct, useCategories
│       ├── pricing.ts        # Centralized cart pricing rules (+ tests)
│       ├── types.ts          # Domain types
│       └── utils.ts          # Discounted-price helper (+ tests)
├── hooks/                    # useDebounce(+Callback), useObserver, useStorage, useFilters
├── layout/                   # Root layout, header, scroll-to-top
├── pages/
│   ├── home/                 # Hero + virtualized listing
│   ├── product/              # Product detail
│   ├── cart/                 # Cart + reusable order summary
│   ├── checkout/             # Multi-step checkout (schema, forms, review)
│   ├── order/                # Order confirmation
│   ├── wishlist/ · compare/  # Wishlist & compare pages
│   └── not-found/            # 404
├── routes/                   # Router + lazy routes + Suspense wrapper
└── test/                     # Vitest setup
```

**Data flow:** server state (products, categories, single product) → **TanStack Query**; client state (cart, wishlist, compare, orders) → **focused React contexts** mirrored to `localStorage`; browse filters → **URL query string**.

---

## Design System

A custom **"Aurora"** theme replaces the default neutral palette:

- **OKLCH tokens** for perceptually-uniform, accessible light/dark pairs.
- An energetic **indigo→violet brand gradient** with an amber accent (deals/ratings) and a green success token (confirmations).
- Consistent radius / spacing / typography (Geist) and signature gradient surfaces for the hero and brand elements.

Everything is driven by CSS variables in `src/index.css`, so the whole look can be re-themed from one place.

---

## Engineering Decisions

- **Server vs. client state are separated.** API data is owned by TanStack Query (caching, dedupe, background refetch); user-owned data (cart/wishlist/compare) lives in React Context. No hand-rolled cache.
- **Stores are split, not one mega-context.** Cart, wishlist, compare, and orders are independent, memoized providers, so a wishlist change never re-renders cart consumers — a concrete fix for the classic context re-render pitfall.
- **Pricing lives in one place.** `features/products/pricing.ts` owns shipping/tax/discount rules and is unit-tested, so the cart, summary, and checkout can never disagree.
- **Virtualization over naive rendering.** The grid windows rows and folds infinite loading into the virtualizer, keeping the DOM flat regardless of how far you scroll.
- **The URL is the source of truth for filters** — shareable, bookmarkable, back/forward-friendly.
- **A checkout that behaves like a real one** — validated multi-step form, simulated request, persisted order, cleared cart, and a proper confirmation.
- **Resilience by default** — an error boundary plus retryable error states, rather than silently showing "no results".
- **Images are optimized at the component level.** A single `ProductImage` centralizes lazy-loading, async decoding, priority hints, CLS-free sizing, fade-in, and error fallback — used consistently across cards, galleries, cart, compare, and checkout.
- **Single Axios instance + interceptor** unwraps `data` and normalizes errors once.

---

## Testing

Unit tests cover the highest-risk logic:

- `pricing.test.ts` — subtotal, discounts, free-shipping threshold, tax, totals.
- `utils.test.ts` — discounted-price math.
- `schema.test.ts` — checkout validation (email, Luhn card, expiry, CVV).
- `cart-provider.test.tsx` — quantity merging, stock caps, removal, clearing, persistence.

```bash
npm test          # run once
npm run test:watch
```

---

## Getting Started

### Prerequisites

- **Node.js 20+** and npm.

### Installation & Run

```bash
npm install       # install dependencies
npm start         # start the Vite dev server (http://localhost:5173)
```

### Production build

```bash
npm run build     # type-check + bundle to /dist
npm run preview   # serve the production build locally
```

---

## Available Scripts

| Script               | Description                                          |
| -------------------- | --------------------------------------------------- |
| `npm start` / `dev`  | Start the Vite dev server with HMR.                 |
| `npm run build`      | Type-check (`tsc`) and build the production bundle. |
| `npm run preview`    | Preview the production build locally.               |
| `npm run lint`       | Run ESLint across the project.                      |
| `npm test`           | Run the unit test suite once (Vitest).              |
| `npm run test:watch` | Run tests in watch mode.                             |

---

## What I Would Do Differently With More Time

- **Responsive images / CDN** — DummyJSON serves fixed-size image URLs, so there's no `srcset`/`sizes` or WebP/AVIF to generate. Behind an image CDN (Cloudinary/imgix), `ProductImage` would emit responsive sources and modern formats; the component is already structured to make that a one-place change.
- **More tests** — component/integration tests for checkout and the virtualized grid, plus a Playwright happy-path E2E (browse → checkout → confirmation).
- **Real auth & orders** — DummyJSON `/auth` login, gated checkout, and an order history page.
- **Optimistic cart & wishlist** with rollback on failure.
- **Analytics & monitoring** — wire the error boundary to Sentry and add basic product/checkout events.
- **i18n & currency** formatting via `Intl`.
- **Admin surface** — product create/update/remove against a mock API.
```
