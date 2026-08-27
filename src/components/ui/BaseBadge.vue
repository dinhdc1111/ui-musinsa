<script setup lang="ts">
import { computed } from 'vue'

import type { BadgeVariant } from '@/types/ui'

interface Props {
  variant?: BadgeVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
})

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'border-border bg-surface text-text',
  accent: 'bg-accent text-accent-contrast',
  sale: 'bg-sale text-accent-contrast',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
}

const badgeClasses = computed(() => variantClasses[props.variant])
</script>

<template>
  <span
    class="rounded-pill text-caption inline-flex min-h-6 items-center border border-transparent px-2 leading-none font-bold whitespace-nowrap"
    :class="badgeClasses"
  >
    <slot />
  </span>
</template>
