import type { EntityId } from '@/types/common'
import type { RouteName } from '@/constants/routes'

export interface NavigationItem {
  id: EntityId
  label: string
  routeName: RouteName
  badge?: string
  children?: NavigationItem[]
}

export interface FooterLink {
  id: EntityId
  label: string
  routeName?: RouteName
}

export interface FooterSection {
  id: EntityId
  title: string
  links: readonly FooterLink[]
}

export interface AnnouncementContent {
  message: string
  actionLabel: string
  to: string
}
