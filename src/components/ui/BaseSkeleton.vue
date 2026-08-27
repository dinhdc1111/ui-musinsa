<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  shape?: 'text' | 'rectangle' | 'circle'
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'rectangle',
  width: '100%',
  height: '1rem',
})

const skeletonStyle = computed(() => ({
  '--skeleton-width': props.width,
  '--skeleton-height': props.height,
}))
</script>

<template>
  <span
    class="base-skeleton bg-surface-muted block overflow-hidden"
    :class="{
      'rounded-control': shape === 'rectangle',
      'rounded-pill': shape === 'text',
      'rounded-full': shape === 'circle',
    }"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>

<style scoped>
.base-skeleton {
  width: var(--skeleton-width);
  height: var(--skeleton-height);
}

.base-skeleton::after {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--ds-color-surface) 72%, transparent),
    transparent
  );
  content: '';
  transform: translateX(-100%);
  animation: skeleton-shimmer 1.4s var(--ds-ease-standard) infinite;
}

@keyframes skeleton-shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
