import { ROUTE_NAMES } from '@/constants/routes'
import type { NavigationItem } from '@/types/navigation'

export const primaryNavigation = [
  { id: 'nav-new', label: 'New', routeName: ROUTE_NAMES.newArrivals },
  { id: 'nav-best', label: 'Best', routeName: ROUTE_NAMES.best },
  { id: 'nav-sale', label: 'Sale', routeName: ROUTE_NAMES.sale, badge: 'Edit' },
  { id: 'nav-brands', label: 'Brands', routeName: ROUTE_NAMES.brands },
] as const satisfies readonly NavigationItem[]
