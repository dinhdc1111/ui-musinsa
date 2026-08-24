import type { EntityId, ImageAsset, LinkAction } from '@/types/common'

export interface Promotion {
  id: EntityId
  slug: string
  eyebrow?: string
  title: string
  description?: string
  image: ImageAsset
  theme: 'light' | 'dark'
  cta: LinkAction
}
