<script setup lang="ts">
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

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<template>
  <button
    class="icon-button"
    :class="[`icon-button--${variant}`, `icon-button--${size}`]"
    :type="type"
    :aria-label="label"
    :title="label"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="icon-button__spinner" aria-hidden="true" />
    <span v-else aria-hidden="true"><slot /></span>
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-grid;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid transparent;
  border-radius: var(--ds-radius-control);
  cursor: pointer;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    background-color var(--ds-motion-fast) var(--ds-ease-standard),
    border-color var(--ds-motion-fast) var(--ds-ease-standard),
    opacity var(--ds-motion-fast) var(--ds-ease-standard);
}

.icon-button--sm {
  width: 2.25rem;
  height: 2.25rem;
}

.icon-button--md {
  width: 2.75rem;
  height: 2.75rem;
}

.icon-button--lg {
  width: 3.25rem;
  height: 3.25rem;
}

.icon-button--primary {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-accent);
}

.icon-button--secondary {
  color: var(--ds-color-text);
  border-color: var(--ds-color-border-strong);
  background: var(--ds-color-surface);
}

.icon-button--ghost {
  color: var(--ds-color-text);
  background: transparent;
}

.icon-button--danger {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-danger);
}

.icon-button:hover:not(:disabled) {
  background: var(--ds-color-surface-muted);
}

.icon-button--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ds-color-accent) 84%, white);
}

.icon-button--danger:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ds-color-danger) 84%, black);
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.icon-button__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: icon-spin 700ms linear infinite;
}

@keyframes icon-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
