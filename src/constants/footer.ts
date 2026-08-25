import { ROUTE_NAMES } from '@/constants/routes'
import type { FooterSection } from '@/types/navigation'

export const footerSections: readonly FooterSection[] = [
  {
    id: 'footer-discover',
    title: 'Discover',
    links: [
      { id: 'footer-new', label: 'New arrivals', routeName: ROUTE_NAMES.newArrivals },
      { id: 'footer-best', label: 'Best sellers', routeName: ROUTE_NAMES.best },
      { id: 'footer-sale', label: 'Sale edit', routeName: ROUTE_NAMES.sale },
      { id: 'footer-brands', label: 'Brands', routeName: ROUTE_NAMES.brands },
    ],
  },
  {
    id: 'footer-customer',
    title: 'Customer',
    links: [
      { id: 'footer-account', label: 'My account', routeName: ROUTE_NAMES.account },
      { id: 'footer-wishlist', label: 'Wishlist', routeName: ROUTE_NAMES.wishlist },
      { id: 'footer-orders', label: 'Order history', routeName: ROUTE_NAMES.orders },
      { id: 'footer-search', label: 'Search', routeName: ROUTE_NAMES.search },
    ],
  },
  {
    id: 'footer-policies',
    title: 'Policies',
    links: [
      { id: 'footer-shipping', label: 'Shipping & returns' },
      { id: 'footer-privacy', label: 'Privacy' },
      { id: 'footer-terms', label: 'Terms & conditions' },
      { id: 'footer-accessibility', label: 'Accessibility' },
    ],
  },
]

export const socialPlaceholders = [
  { id: 'social-instagram', label: 'Instagram' },
  { id: 'social-youtube', label: 'YouTube' },
  { id: 'social-facebook', label: 'Facebook' },
] as const
