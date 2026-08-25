<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import SiteFooter from '@/components/layout/SiteFooter.vue'
import MobileNavigationDrawer from '@/components/navigation/MobileNavigationDrawer.vue'
import SiteHeader from '@/components/navigation/SiteHeader.vue'

const isNavigationOpen = ref(false)
</script>

<template>
  <div class="site-layout">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <SiteHeader @open-navigation="isNavigationOpen = true" />
    <MobileNavigationDrawer v-model="isNavigationOpen" />
    <main id="main-content" class="site-layout__main" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
