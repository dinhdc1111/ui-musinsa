import type { EntityId, ImageAsset } from '@/types/common'

export interface Money {
  amount: number
  currency: 'VND'
}

export interface ProductPrice {
  current: Money
  original?: Money
  discountPercent?: number
}

export type ProductBadge = 'new' | 'sale' | 'best' | 'exclusive'

export interface Product {
  id: EntityId
  slug: string
  brandId: EntityId
  brandName: string
  name: string
  image: ImageAsset
  hoverImage?: ImageAsset
  price: ProductPrice
  badges?: ProductBadge[]
  rating?: number
  reviewCount?: number
  rank?: number
}

export interface Brand {
  id: EntityId
  slug: string
  name: string
  description?: string
  logo?: ImageAsset
  cover?: ImageAsset
}

export interface Category {
  id: EntityId
  slug: string
  name: string
  image?: ImageAsset
  children?: Category[]
}
