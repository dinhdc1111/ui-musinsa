<script setup lang="ts">
interface Props {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: false,
})
</script>

<template>
  <div
    class="base-divider"
    :class="`base-divider--${orientation}`"
    :role="decorative ? undefined : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
    :aria-hidden="decorative || undefined"
  />
</template>

<style scoped>
.base-divider {
  flex: 0 0 auto;
  border: 0;
  background: var(--ds-color-border);
}

.base-divider--horizontal {
  width: 100%;
  height: 1px;
}

.base-divider--vertical {
  align-self: stretch;
  width: 1px;
  min-height: 1.5rem;
}
</style>
