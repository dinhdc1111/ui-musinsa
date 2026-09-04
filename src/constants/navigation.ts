import { ROUTE_NAMES } from '@/constants/routes'
import type { NavigationItem } from '@/types/navigation'

export const primaryNavigation: readonly NavigationItem[] = [
  { id: 'nav-category', label: 'Category', routeName: ROUTE_NAMES.products },
  { id: 'nav-brand-day', label: '#Brand day', routeName: ROUTE_NAMES.sale, badge: 'Extra 20%' },
  { id: 'nav-member', label: 'New member', routeName: ROUTE_NAMES.register, badge: '30% off' },
  { id: 'nav-fashion', label: 'Fashion', routeName: ROUTE_NAMES.products },
  { id: 'nav-sale', label: 'Sale', routeName: ROUTE_NAMES.sale },
  { id: 'nav-best', label: 'Best', routeName: ROUTE_NAMES.best },
  {
    id: 'nav-standard',
    label: '#Musinsa standard',
    routeName: ROUTE_NAMES.products,
    badge: 'Extra 30%',
  },
  { id: 'nav-snap', label: 'Snap', routeName: ROUTE_NAMES.products },
  { id: 'nav-new', label: 'New', routeName: ROUTE_NAMES.newArrivals },
  { id: 'nav-brands', label: 'Brands', routeName: ROUTE_NAMES.brands },
]

export const accountNavigation: readonly NavigationItem[] = [
  { id: 'nav-account', label: 'My account', routeName: ROUTE_NAMES.account },
  { id: 'nav-wishlist', label: 'Wishlist', routeName: ROUTE_NAMES.wishlist },
  { id: 'nav-cart', label: 'Cart', routeName: ROUTE_NAMES.cart },
]
