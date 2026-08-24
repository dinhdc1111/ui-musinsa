import type { RouteRecordRaw } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import HomePage from '@/pages/HomePage.vue'

const plannedPage = () => import('@/pages/RoutePlaceholderPage.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    meta: {
      layout: 'default',
      title: 'Storefront',
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.home,
        component: HomePage,
        meta: {
          layout: 'default',
          title: 'Home',
          description: 'The homepage UI will be implemented in Phase 5.',
          implementationPhase: 5,
        },
      },
      {
        path: 'products',
        name: ROUTE_NAMES.products,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'All products',
          description: 'The shared product listing experience is planned for Phase 6.',
          implementationPhase: 6,
        },
      },
      {
        path: 'categories/:slug',
        name: ROUTE_NAMES.category,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Category',
          description: 'Category routes will reuse the shared listing experience.',
          implementationPhase: 6,
        },
      },
      {
        path: 'brands',
        name: ROUTE_NAMES.brands,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Brands',
          description: 'The brand directory is planned alongside catalog discovery.',
          implementationPhase: 6,
        },
      },
      {
        path: 'brands/:slug',
        name: ROUTE_NAMES.brand,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Brand shop',
          description: 'Brand shops will provide context to the shared product listing UI.',
          implementationPhase: 6,
        },
      },
      {
        path: 'search',
        name: ROUTE_NAMES.search,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Search',
          description: 'Search results will be driven by route query and typed mock data.',
          implementationPhase: 6,
        },
      },
      {
        path: 'products/:slug',
        name: ROUTE_NAMES.product,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Product detail',
          description: 'Product gallery and option interactions are planned for Phase 7.',
          implementationPhase: 7,
        },
      },
      {
        path: 'new',
        name: ROUTE_NAMES.newArrivals,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'New arrivals',
          description: 'This route will reuse the listing UI with a new-arrivals preset.',
          implementationPhase: 6,
        },
      },
      {
        path: 'best',
        name: ROUTE_NAMES.best,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Best sellers',
          description: 'This route will reuse the listing UI with a best-seller preset.',
          implementationPhase: 6,
        },
      },
      {
        path: 'sale',
        name: ROUTE_NAMES.sale,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Sale',
          description: 'This route will reuse the listing UI with a sale preset.',
          implementationPhase: 6,
        },
      },
      {
        path: 'promotions/:slug',
        name: ROUTE_NAMES.promotion,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Promotion',
          description: 'Promotion detail remains a UI-only campaign surface.',
          implementationPhase: 5,
        },
      },
      {
        path: 'wishlist',
        name: ROUTE_NAMES.wishlist,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Wishlist',
          description: 'Wishlist presentation and local UI feedback are planned for Phase 8.',
          implementationPhase: 8,
        },
      },
      {
        path: 'cart',
        name: ROUTE_NAMES.cart,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Cart',
          description: 'The cart remains a mock UI without checkout or persistence.',
          implementationPhase: 8,
        },
      },
      {
        path: 'account',
        name: ROUTE_NAMES.account,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'My account',
          description: 'Account presentation is planned without authentication logic.',
          implementationPhase: 8,
        },
      },
      {
        path: 'account/orders',
        name: ROUTE_NAMES.orders,
        component: plannedPage,
        meta: {
          layout: 'default',
          title: 'Order history',
          description: 'Order cards will be rendered from static typed fixtures.',
          implementationPhase: 8,
        },
      },
    ],
  },
  {
    path: '/login',
    component: AuthLayout,
    meta: {
      layout: 'auth',
      title: 'Sign in',
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.login,
        component: plannedPage,
        meta: {
          layout: 'auth',
          title: 'Sign in',
          description: 'The form will be UI-only with local validation states.',
          implementationPhase: 8,
        },
      },
    ],
  },
  {
    path: '/register',
    component: AuthLayout,
    meta: {
      layout: 'auth',
      title: 'Create account',
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.register,
        component: plannedPage,
        meta: {
          layout: 'auth',
          title: 'Create account',
          description: 'Registration remains a presentation-only form in Phase 8.',
          implementationPhase: 8,
        },
      },
    ],
  },
  {
    path: '/error',
    component: EmptyLayout,
    meta: {
      layout: 'empty',
      title: 'Something went wrong',
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.error,
        component: plannedPage,
        meta: {
          layout: 'empty',
          title: 'Something went wrong',
          description: 'A recoverable error state will be implemented in Phase 8.',
          implementationPhase: 8,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: EmptyLayout,
    meta: {
      layout: 'empty',
      title: 'Page not found',
    },
    children: [
      {
        path: '',
        name: ROUTE_NAMES.notFound,
        component: plannedPage,
        meta: {
          layout: 'empty',
          title: 'Page not found',
          description: 'Use the home link to return to the storefront foundation.',
          implementationPhase: 8,
        },
      },
    ],
  },
]
