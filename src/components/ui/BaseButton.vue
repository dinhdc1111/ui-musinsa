<script setup lang="ts">
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

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) emit('click', event)
}
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`, { 'base-button--full': fullWidth }]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <span class="base-button__content" :class="{ 'base-button__content--loading': loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
  border: 1px solid transparent;
  border-radius: var(--ds-radius-control);
  font-size: var(--ds-type-label-size);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1;
  cursor: pointer;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    background-color var(--ds-motion-fast) var(--ds-ease-standard),
    border-color var(--ds-motion-fast) var(--ds-ease-standard),
    opacity var(--ds-motion-fast) var(--ds-ease-standard);
}

.base-button--sm {
  min-height: 2.25rem;
  padding: 0 var(--ds-space-3);
}

.base-button--md {
  min-height: 2.75rem;
  padding: 0 var(--ds-space-5);
}

.base-button--lg {
  min-height: 3.25rem;
  padding: 0 var(--ds-space-6);
}

.base-button--primary {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-accent);
}

.base-button--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ds-color-accent) 84%, white);
}

.base-button--secondary {
  color: var(--ds-color-text);
  border-color: var(--ds-color-border-strong);
  background: var(--ds-color-surface);
}

.base-button--secondary:hover:not(:disabled),
.base-button--ghost:hover:not(:disabled) {
  background: var(--ds-color-surface-muted);
}

.base-button--ghost {
  color: var(--ds-color-text);
  background: transparent;
}

.base-button--danger {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-danger);
}

.base-button--danger:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ds-color-danger) 84%, black);
}

.base-button--full {
  width: 100%;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.base-button__content {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
}

.base-button__content--loading {
  visibility: hidden;
}

.base-button__spinner {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: button-spin 700ms linear infinite;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
