<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
</script>

<template>
  <section class="app-shell" aria-labelledby="foundation-title">
    <div class="app-shell__content">
      <p class="app-shell__eyebrow">Vue 3 storefront architecture</p>
      <h1 id="foundation-title" class="app-shell__title">Ready for the design system phase.</h1>
      <p class="app-shell__description">
        Layout routes, strict domain models and typed mock-data boundaries are configured.
      </p>
      <a class="app-shell__link" href="https://vuejs.org/" target="_blank" rel="noreferrer">
        Vue documentation
        <ArrowRight :size="16" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>
