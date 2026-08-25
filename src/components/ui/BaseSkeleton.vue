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
    class="base-skeleton"
    :class="`base-skeleton--${shape}`"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>

<style scoped>
.base-skeleton {
  display: block;
  width: var(--skeleton-width);
  height: var(--skeleton-height);
  overflow: hidden;
  border-radius: var(--ds-radius-control);
  background: var(--ds-color-surface-muted);
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

.base-skeleton--text {
  border-radius: var(--ds-radius-pill);
}

.base-skeleton--circle {
  border-radius: 50%;
}

@keyframes skeleton-shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
