<script setup lang="ts">
import type { BadgeVariant } from '@/types/ui'

interface Props {
  variant?: BadgeVariant
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
})
</script>

<template>
  <span class="base-badge" :class="`base-badge--${variant}`"><slot /></span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0 var(--ds-space-2);
  border: 1px solid transparent;
  border-radius: var(--ds-radius-pill);
  font-size: var(--ds-type-caption-size);
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}

.base-badge--neutral {
  color: var(--ds-color-text);
  border-color: var(--ds-color-border);
  background: var(--ds-color-surface);
}

.base-badge--accent {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-accent);
}

.base-badge--sale {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-sale);
}

.base-badge--success {
  color: var(--ds-color-success);
  background: color-mix(in srgb, var(--ds-color-success) 12%, white);
}

.base-badge--warning {
  color: var(--ds-color-warning);
  background: color-mix(in srgb, var(--ds-color-warning) 12%, white);
}

.base-badge--danger {
  color: var(--ds-color-danger);
  background: color-mix(in srgb, var(--ds-color-danger) 12%, white);
}
</style>
