import productPlaceholder from '@/assets/images/product-placeholder.svg'
import type { Brand, Category, Product } from '@/types/catalog'

export const mockBrands = [
  {
    id: 'brand-north-archive',
    slug: 'north-archive',
    name: 'North Archive',
    description: 'A fictional label used only to validate the UI data boundary.',
  },
] as const satisfies readonly Brand[]

export const mockCategories = [
  {
    id: 'category-new-arrivals',
    slug: 'new-arrivals',
    name: 'New arrivals',
  },
  {
    id: 'category-clothing',
    slug: 'clothing',
    name: 'Clothing',
    children: [
      { id: 'category-tops', slug: 'tops', name: 'Tops' },
      { id: 'category-outerwear', slug: 'outerwear', name: 'Outerwear' },
    ],
  },
] as const satisfies readonly Category[]

export const mockProducts = [
  {
    id: 'product-structured-overshirt',
    slug: 'structured-overshirt',
    brandId: 'brand-north-archive',
    brandName: 'North Archive',
    name: 'Structured Overshirt',
    image: {
      src: productPlaceholder,
      alt: 'Neutral placeholder for a future fashion product photograph',
      width: 900,
      height: 1200,
    },
    price: {
      current: { amount: 1_490_000, currency: 'VND' },
    },
    badges: ['new'],
  },
] as const satisfies readonly Product[]
