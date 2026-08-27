<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import SiteFooter from '@/components/layout/SiteFooter.vue'
import MobileBottomNavigation from '@/components/navigation/MobileBottomNavigation.vue'
import MobileNavigationDrawer from '@/components/navigation/MobileNavigationDrawer.vue'
import SiteHeader from '@/components/navigation/SiteHeader.vue'

const isNavigationOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      class="rounded-control bg-accent text-label text-accent-contrast focus-visible:outline-focus fixed top-3 left-3 z-[var(--ds-z-toast)] -translate-y-[calc(100%+1.5rem)] px-4 py-3 font-bold no-underline transition-transform focus-visible:translate-y-0"
      href="#main-content"
    >
      Skip to content
    </a>
    <SiteHeader @open-navigation="isNavigationOpen = true" />
    <MobileNavigationDrawer v-model="isNavigationOpen" />
    <main
      id="main-content"
      class="flex min-h-0 flex-1 scroll-mt-18 flex-col focus:outline-none lg:scroll-mt-32"
      tabindex="-1"
    >
      <RouterView />
    </main>
    <SiteFooter />
    <MobileBottomNavigation @open-navigation="isNavigationOpen = true" />
  </div>
</template>
