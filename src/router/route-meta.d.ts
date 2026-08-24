import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout: 'default' | 'auth' | 'empty'
    title: string
    description?: string
    implementationPhase?: number
  }
}
