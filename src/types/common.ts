export type EntityId = string

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  mobileSrc?: string
}

export interface LinkAction {
  label: string
  to: string
}
