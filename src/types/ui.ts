export type ControlSize = 'sm' | 'md' | 'lg'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export type BadgeVariant = 'neutral' | 'accent' | 'sale' | 'success' | 'warning' | 'danger'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}
