import type { BadgeVariant, ButtonVariant, SelectOption, TabItem } from '@/types/ui'

export const buttonExamples = [
  { label: 'Primary action', variant: 'primary' },
  { label: 'Secondary action', variant: 'secondary' },
  { label: 'Ghost action', variant: 'ghost' },
  { label: 'Destructive action', variant: 'danger' },
] as const satisfies readonly { label: string; variant: ButtonVariant }[]

export const badgeExamples = [
  { label: 'Neutral', variant: 'neutral' },
  { label: 'Exclusive', variant: 'accent' },
  { label: 'Sale', variant: 'sale' },
  { label: 'In stock', variant: 'success' },
  { label: 'Low stock', variant: 'warning' },
  { label: 'Unavailable', variant: 'danger' },
] as const satisfies readonly { label: string; variant: BadgeVariant }[]

export const categoryOptions = [
  { value: 'new', label: 'New arrivals' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'tops', label: 'Tops' },
  { value: 'archived', label: 'Archived collection', disabled: true },
] as const satisfies readonly SelectOption[]

export const styleGuideTabs = [
  { id: 'details', label: 'Details' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'disabled', label: 'Unavailable', disabled: true },
] as const satisfies readonly TabItem[]

export const colorExamples = [
  { label: 'Canvas', token: '--ds-color-canvas' },
  { label: 'Surface', token: '--ds-color-surface' },
  { label: 'Text', token: '--ds-color-text' },
  { label: 'Muted', token: '--ds-color-muted' },
  { label: 'Border', token: '--ds-color-border' },
  { label: 'Accent', token: '--ds-color-accent' },
  { label: 'Sale', token: '--ds-color-sale' },
  { label: 'Success', token: '--ds-color-success' },
  { label: 'Warning', token: '--ds-color-warning' },
  { label: 'Danger', token: '--ds-color-danger' },
  { label: 'Focus', token: '--ds-color-focus' },
] as const

export const skeletonRows = ['skeleton-1', 'skeleton-2', 'skeleton-3'] as const
