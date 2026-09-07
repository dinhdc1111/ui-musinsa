<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="auth-layout bg-canvas flex min-h-dvh flex-col">
    <a
      class="bg-accent text-accent-contrast fixed top-3 left-3 z-60 -translate-y-20 px-4 py-2 text-sm font-bold transition-transform focus:translate-y-0"
      href="#main-content"
    >
      Skip to content
    </a>

    <main id="main-content" class="min-h-dvh" tabindex="-1">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
:global(body:has(.auth-layout)) {
  padding-bottom: 0;
}
</style>
