<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'

const route = useRoute()

const title = computed(() => route.meta.title)
const description = computed(
  () => route.meta.description ?? 'This route is reserved for a later UI phase.',
)
const implementationPhase = computed(() => route.meta.implementationPhase)
</script>

<template>
  <section
    class="bg-canvas px-page-gutter grid min-h-128 w-full flex-1 place-items-center"
    :aria-labelledby="`route-title-${String(route.name)}`"
  >
    <div class="max-w-reading w-full">
      <p v-if="implementationPhase" class="text-caption mb-4 font-bold tracking-[0.12em] uppercase">
        Planned for Phase {{ implementationPhase }}
      </p>
      <h1
        :id="`route-title-${String(route.name)}`"
        class="font-display text-heading m-0 leading-[0.96] font-medium tracking-[-0.04em]"
      >
        {{ title }}
      </h1>
      <p class="text-body leading-body text-muted mt-6 max-w-[34rem]">{{ description }}</p>
      <RouterLink
        class="text-label mt-8 inline-flex min-h-11 items-center gap-2 font-bold underline-offset-4"
        :to="{ name: ROUTE_NAMES.home }"
      >
        <ArrowLeft :size="16" aria-hidden="true" />
        Return home
      </RouterLink>
    </div>
  </section>
</template>
