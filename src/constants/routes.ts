export const ROUTE_NAMES = {
  home: 'home',
  products: 'products',
  category: 'category',
  brands: 'brands',
  brand: 'brand',
  search: 'search',
  product: 'product',
  newArrivals: 'new-arrivals',
  best: 'best',
  sale: 'sale',
  promotion: 'promotion',
  login: 'login',
  register: 'register',
  wishlist: 'wishlist',
  cart: 'cart',
  account: 'account',
  orders: 'orders',
  error: 'error',
  notFound: 'not-found',
} as const

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES]
