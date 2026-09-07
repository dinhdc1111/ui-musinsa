<script setup lang="ts">
import { computed } from 'vue'

import type { ButtonVariant, ControlSize } from '@/types/ui'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ControlSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-contrast hover:not-disabled:bg-accent-hover',
  secondary: 'border-border-strong bg-surface text-text hover:not-disabled:bg-surface-muted',
  ghost: 'bg-transparent text-text hover:not-disabled:bg-surface-muted',
  danger: 'bg-danger text-accent-contrast hover:not-disabled:bg-danger-hover',
}

const sizeClasses: Record<ControlSize, string> = {
  sm: 'min-h-9 px-3',
  md: 'min-h-11 px-5',
  lg: 'min-h-12 px-6',
}

const buttonClasses = computed(() => [
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.fullWidth && 'w-full',
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<template>
  <button
    class="text-label focus-visible:ring-focus relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent leading-none font-bold tracking-[0.01em] transition-[color,background-color,border-color,box-shadow,transform] duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 active:not-disabled:translate-y-px disabled:cursor-not-allowed disabled:opacity-48"
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="absolute size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
      aria-hidden="true"
    />
    <span class="inline-flex items-center justify-center gap-2" :class="{ invisible: loading }">
      <slot />
    </span>
  </button>
</template>
