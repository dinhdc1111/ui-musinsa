<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
</script>

<template>
  <main class="app-shell">
    <section class="app-shell__content" aria-labelledby="foundation-title">
      <p class="app-shell__eyebrow">Vue 3 storefront foundation</p>
      <h1 id="foundation-title" class="app-shell__title">Ready for the next UI phase.</h1>
      <p class="app-shell__description">
        Router, strict TypeScript, Tailwind CSS and project tooling are configured.
      </p>
      <a class="app-shell__link" href="https://vuejs.org/" target="_blank" rel="noreferrer">
        Vue documentation
        <ArrowRight :size="16" aria-hidden="true" />
      </a>
    </section>
  </main>
</template>
