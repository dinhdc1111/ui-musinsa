import type { EntityId } from '@/types/common'
import type { RouteName } from '@/constants/routes'

export interface NavigationItem {
  id: EntityId
  label: string
  routeName: RouteName
  badge?: string
  children?: NavigationItem[]
}
