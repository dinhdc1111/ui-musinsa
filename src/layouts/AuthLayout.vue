<script setup lang="ts">
import { RouterView } from 'vue-router'

import SiteWordmark from '@/components/navigation/SiteWordmark.vue'
</script>

<template>
  <div class="bg-canvas flex min-h-screen flex-col">
    <header class="px-page-gutter flex min-h-20 items-center md:min-h-24">
      <SiteWordmark />
    </header>
    <main id="main-content" class="grid min-h-0 flex-1 place-items-center">
      <RouterView />
    </main>
  </div>
</template>
