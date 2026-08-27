<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  decorative: false,
})

const orientationClasses = computed(() =>
  props.orientation === 'horizontal' ? 'h-px w-full' : 'min-h-6 w-px self-stretch',
)
</script>

<template>
  <div
    class="bg-border flex-none border-0"
    :class="orientationClasses"
    :role="decorative ? undefined : 'separator'"
    :aria-orientation="decorative ? undefined : orientation"
    :aria-hidden="decorative || undefined"
  />
</template>
