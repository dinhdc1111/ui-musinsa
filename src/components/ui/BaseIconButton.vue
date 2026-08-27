<script setup lang="ts">
import { computed } from 'vue'

import type { ButtonVariant, ControlSize } from '@/types/ui'

interface Props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ControlSize
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'ghost',
  size: 'md',
  disabled: false,
  loading: false,
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
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-13',
}

const buttonClasses = computed(() => [variantClasses[props.variant], sizeClasses[props.size]])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<template>
  <button
    class="rounded-control inline-grid flex-none cursor-pointer place-items-center border border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-48"
    :class="buttonClasses"
    :type="type"
    :aria-label="label"
    :title="label"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none"
      aria-hidden="true"
    />
    <span v-else aria-hidden="true"><slot /></span>
  </button>
</template>
