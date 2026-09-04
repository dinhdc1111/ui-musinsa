# Fashion Storefront UI

A MUSINSA-inspired fashion storefront built with Vue 3, TypeScript, and Vite. The project currently focuses on presentation, responsive user experience, and reusable components. Product and campaign data are provided by local mock files.

> This is an educational UI project and is not an official MUSINSA website.

## Features

- Responsive home page with a hero carousel, featured campaigns, product collections, and brand sections.
- Product detail page with a media gallery, option selection, and UI-only purchase actions.
- Login and registration forms with client-side validation; no authentication service is connected yet.
- Responsive header, desktop navigation, mobile drawer, and mobile bottom navigation.
- Internal style guide with reusable UI components such as buttons, inputs, selects, modals, drawers, tabs, badges, and skeletons.
- Keyboard navigation, visible focus states, and reduced-motion support.
- Declared routes for the catalog, search, cart, wishlist, and account areas; some currently render placeholder pages.

## Tech Stack

- [Vue 3](https://vuejs.org/) with the Composition API
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Swiper](https://swiperjs.com/) for carousels
- [Lucide](https://lucide.dev/) for icons
- ESLint and Prettier

## Requirements

- Node.js `^20.19.0`, `^22.12.0`, or `>=24.0.0`
- pnpm `>=10.0.0`

The package manager version declared by the project is pnpm `11.23.0`.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open the URL shown by Vite in the terminal after the development server starts. The default address is `http://localhost:5173`. No environment file is currently required to run the mock storefront.

## Available Scripts

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Start the development server with hot reload    |
| `pnpm build`        | Run type checking and create a production build |
| `pnpm preview`      | Preview the production build locally            |
| `pnpm typecheck`    | Check TypeScript and Vue component types        |
| `pnpm lint`         | Run ESLint with zero warnings allowed           |
| `pnpm format`       | Format the codebase with Prettier               |
| `pnpm format:check` | Check formatting without changing files         |

## Main Routes

| Path                                                   | Status                                 |
| ------------------------------------------------------ | -------------------------------------- |
| `/`                                                    | Implemented home page                  |
| `/products/:slug`                                      | Implemented product detail page        |
| `/login`                                               | UI-only login form                     |
| `/register`                                            | UI-only registration form              |
| `/style-guide`                                         | Visual reference for the design system |
| `/products`, `/categories/:slug`, `/brands`, `/search` | Declared; currently use placeholders   |
| `/new`, `/best`, `/sale`, `/promotions/:slug`          | Declared; currently use placeholders   |
| `/wishlist`, `/cart`, `/account`, `/account/orders`    | Declared; currently use placeholders   |

A mock product can be opened directly at `/products/home-product-1`.

## Project Structure

```text
src/
├── assets/         # Fonts, product images, and campaign images
├── components/
│   ├── auth/       # Authentication form shell
│   ├── home/       # Home product cards and product rails
│   ├── layout/     # Footer and shared layout elements
│   ├── navigation/ # Header and desktop/mobile navigation
│   └── ui/         # Reusable UI primitives
├── composables/    # Shared Vue logic
├── constants/      # Route names and navigation configuration
├── data/mock/      # Static UI data
├── layouts/        # Default, authentication, and empty layouts
├── pages/          # Route-level pages
├── router/         # Vue Router configuration
├── styles/         # Global CSS and design tokens
├── types/          # TypeScript data types
├── App.vue
└── main.ts
```

## Development Conventions

- Prefer Tailwind utility classes and the semantic tokens defined in `src/styles/tokens.css`.
- Build interfaces mobile-first.
- Do not hard-code reusable colors in Vue components; define semantic tokens instead.
- Every interactive control must have a visible `focus-visible` state.
- Keep typed mock data in `src/data/mock`.
- The `@` alias points to the `src` directory.

Before completing a change, run:

```bash
pnpm lint
pnpm format:check
pnpm build
```

## Current Limitations

- No backend or API integration.
- Login and registration only validate input in the browser and do not create user sessions.
- Cart, wishlist, account, and checkout flows do not yet include business logic or persistent storage.
- Several routes currently display placeholder content for planned development phases.
