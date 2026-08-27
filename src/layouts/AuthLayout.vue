<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'
</script>

<template>
  <div class="bg-canvas flex min-h-screen flex-col">
    <RouterLink
      class="text-label m-6 self-start font-extrabold tracking-[-0.02em] no-underline md:m-8"
      :to="{ name: ROUTE_NAMES.home }"
    >
      Fashion Storefront
    </RouterLink>
    <main id="main-content" class="grid min-h-0 flex-1 place-items-center">
      <RouterView />
    </main>
  </div>
</template>
