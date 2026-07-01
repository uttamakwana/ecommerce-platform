# E-Commerce Platform

A production-minded, single-page e-commerce application for browsing, searching, filtering, and buying products. Built with React + TypeScript and a real public product API, with a persistent cart, a full checkout experience, dark/light theming, infinite scrolling, and URL-driven filters.

> **Assignment:** SDE-2 Frontend Challenge #2 — _Build a production-ready e-commerce platform._

---

## Table of Contents

- [Live Data Source](#live-data-source)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture & Project Structure](#architecture--project-structure)
- [Key Decisions](#key-decisions)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [What I Would Do Differently With More Time](#what-i-would-do-differently-with-more-time)

---

## Live Data Source

The app uses the free, public **[DummyJSON](https://dummyjson.com)** API — no backend or API key required. It provides realistic product data (title, brand, price, discount, rating, reviews, stock, images) plus endpoints for listing, single-product lookup, categories, category filtering, search, sorting, and pagination.

| Concern                     | Endpoint                       |
| --------------------------- | ------------------------------ |
| Product listing (paginated) | `GET /products`                |
| Single product              | `GET /products/:id`            |
| Categories                  | `GET /products/categories`     |
| Filter by category          | `GET /products/category/:slug` |
| Search                      | `GET /products/search?q=`      |

---

## Tech Stack

| Area          | Choice                           | Why                                                                                         |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| Framework     | **React 19** + **TypeScript**    | Type safety and modern React (with the React Compiler for automatic memoization).           |
| Build tool    | **Vite**                         | Fast dev server and optimized production builds.                                            |
| Styling       | **Tailwind CSS v4**              | Utility-first, themeable, fast to iterate on.                                               |
| UI primitives | **shadcn/ui** (Radix UI)         | Accessible, unstyled primitives (dialog, dropdown, select, alert, ...) I can fully control. |
| Server state  | **TanStack Query v5**            | Caching, background refetching, and infinite queries out of the box.                        |
| Routing       | **React Router**                 | Declarative routes with a shared layout.                                                    |
| Client state  | **React Context + localStorage** | Lightweight cart state that persists across reloads and tabs.                               |
| HTTP          | **Axios**                        | A single configured instance with a response interceptor for central error handling.        |
| Notifications | **Sonner**                       | Toasts for cart feedback.                                                                   |
| Animation     | **Motion** (Framer Motion)       | Animated order-confirmation check icon.                                                     |
| Delight       | **canvas-confetti**              | Celebratory confetti on successful checkout.                                                |
| Icons         | **lucide-react**                 | Consistent icon set.                                                                        |

---

## Features

### Browsing

- **Product grid** with responsive columns (1 → 5 across mobile to ultra-wide).
- **Infinite scroll** powered by `IntersectionObserver` — new pages load automatically as you reach the last card.
- **Skeleton loaders** for the grid, category pills, and product details so layout never jumps.
- **Product details page** with image, brand, category, price/discount, rating, review count, stock, and add/remove-from-cart.

### Search, Filter & Sort

- **Debounced search** (500 ms) that updates results as you type without hammering the API.
- **Category filtering** via both a scrollable pill bar and a dropdown.
- **Sorting** by a curated set of fields (title, price, rating, discount, stock) with an **ascending/descending** toggle and a **clear-filters** action.
- **URL-driven state** — the active category, search term, and sort options live in the query string, so filters are **shareable, bookmarkable, and survive refresh / back-forward navigation**.

### Cart & Checkout

- **Add / remove** items with instant toast feedback.
- **Quantity controls** with **stock-aware limits** (you can't exceed available stock, and can't go below 1).
- **Persistent cart** stored in `localStorage`, including **cross-tab synchronization** (add an item in one tab, it appears in another).
- **Cart badge** in the header showing the number of items.
- **Order summary** with a full breakdown — subtotal, discount, flat shipping, and tax — and a computed grand total.
- **Checkout experience** — "Proceed to Checkout" launches a confetti celebration and an **order-confirmation dialog** showing a generated Order ID and estimated delivery. _(It's a demo checkout — no payment is taken and no real order is placed.)_

### UX / UI

- **Dark / Light / System theme** toggle, persisted across sessions.
- **Empty states** for an empty cart and no-results searches.
- **Custom 404 page** with "Go Home" / "Go Back" actions.
- Fully **responsive** layout.

### Engineering

- **Feature-based folder structure** that scales.
- **Central Axios instance** with a response interceptor that unwraps `data` and normalizes errors in one place.
- **Typed API layer** and query keys for predictable caching.
- **React Compiler** enabled for automatic memoization.

---

## Architecture & Project Structure

The project follows a **feature-first** organization: cross-cutting building blocks live at the top level, while product-specific logic is colocated under `features/products`.

```
src/
├── api/                     # Axios instance, base config, HTTP helpers, query client
├── components/
│   ├── search/              # Search bar, category pills, category dropdown, cart button
│   └── ui/                  # shadcn/ui primitives (button, card, select, dialog, alert, ...)
├── contexts/
│   ├── product/             # Cart + filter context (client state) and its hooks
│   └── theme-provider.tsx   # Dark/light/system theme
├── features/
│   └── products/            # Product domain: API, hooks, components, types, utils
│       ├── api/             # Endpoints + query keys
│       ├── components/      # ProductCard, skeletons, sort select, breadcrumb, ...
│       ├── hooks/           # useProducts (infinite), useGetProduct, useCategories
│       ├── types.ts         # Product domain types
│       └── utils.ts         # e.g. discounted-price calculation
├── hooks/                   # Reusable hooks: useDebounce, useObserver, useStorage
├── layout/                  # Root layout + header
├── pages/
│   ├── cart/                # Cart, summary, checkout modal, confetti, confirmation icon
│   ├── home/                # Product listing
│   ├── product/             # Product details
│   └── not-found/           # 404
└── routes/                  # Router configuration
```

**Data flow at a glance:**

- **Server state** (products, categories, single product) → **TanStack Query** with caching, `staleTime`, and infinite pagination.
- **Client state** (cart, filters) → **React Context**. Cart is mirrored to `localStorage`; filters are mirrored to the **URL query string**.

---

## Key Decisions

- **Server state vs. client state are separated.** Anything that comes from the API is owned by TanStack Query (so I get caching, dedupe, and background refetch for free). Anything the user owns — the cart and active filters — lives in React Context. This keeps each concern simple and avoids re-inventing a cache.

- **The URL is the source of truth for filters.** Category, search, and sort are stored in `searchParams` rather than component state. This makes result views shareable and bookmarkable, and makes the browser's back/forward buttons "just work."

- **Infinite scroll over pagination.** For product discovery, an `IntersectionObserver`-based infinite scroll feels more natural than page numbers and pairs cleanly with `useInfiniteQuery`.

- **Debounced search.** Search input is debounced so we only query after the user pauses typing, reducing unnecessary network calls.

- **A single Axios instance with an interceptor.** Response data is unwrapped once (`res.data`) and errors are normalized in one place, so call sites stay clean and don't repeat `.data` everywhere.

- **shadcn/ui + Tailwind v4.** Rather than a heavyweight component library, I used accessible Radix-based primitives I can fully restyle, which keeps the bundle and the design under my control.

- **localStorage-backed cart with cross-tab sync.** A custom `useStorage` hook persists the cart and listens to the `storage` event so multiple tabs stay consistent.

- **A checkout that feels finished.** Even without a backend, the flow ends in a clear confirmation (order ID, estimated delivery) plus a small moment of delight (confetti), so "purchasing" is a complete experience rather than a dead-end button.

---

## Getting Started

### Prerequisites

- **Node.js 20+** and npm.

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

The app will be available at the URL Vite prints (default **http://localhost:5173**).

### Production build

```bash
npm run build     # type-check + bundle to /dist
npm run preview   # serve the production build locally
```

---

## Available Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm start`       | Start the Vite dev server with HMR.                 |
| `npm run dev`     | Alias for `start`.                                  |
| `npm run build`   | Type-check (`tsc`) and build the production bundle. |
| `npm run preview` | Preview the production build locally.               |
| `npm run lint`    | Run ESLint across the project.                      |

---

## What I Would Do Differently With More Time

- **Richer product page.** Use the full `images[]` gallery instead of only the thumbnail, and render the actual customer **reviews** (the data is already available).
- **Wishlist / favorites.**
- **Automated tests.** Unit tests for the cart/price logic (Vitest) and component/integration tests (React Testing Library).
- **Resilience.** Add error boundaries and explicit retry UI for failed requests, rather than relying on empty states.
-- **Admin Side.** Add the product add, update and remove flow for better product control.

---