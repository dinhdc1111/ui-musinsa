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
  <section class="route-placeholder" :aria-labelledby="`route-title-${String(route.name)}`">
    <div class="route-placeholder__content">
      <p v-if="implementationPhase" class="app-shell__eyebrow">
        Planned for Phase {{ implementationPhase }}
      </p>
      <h1 :id="`route-title-${String(route.name)}`" class="route-placeholder__title">
        {{ title }}
      </h1>
      <p class="route-placeholder__description">{{ description }}</p>
      <RouterLink class="app-shell__link" :to="{ name: ROUTE_NAMES.home }">
        <ArrowLeft :size="16" aria-hidden="true" />
        Return home
      </RouterLink>
    </div>
  </section>
</template>
