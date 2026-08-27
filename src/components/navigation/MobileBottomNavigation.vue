<script setup lang="ts">
import { Heart, Home, Search, Tag, UserRound } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'

const emit = defineEmits<{
  'open-navigation': []
}>()
</script>

<template>
  <nav class="mobile-bottom-navigation" aria-label="Mobile navigation">
    <RouterLink :to="{ name: ROUTE_NAMES.home }"><Home :size="21" /><span>Home</span></RouterLink>
    <button type="button" @click="emit('open-navigation')">
      <Search :size="21" /><span>Category</span>
    </button>
    <RouterLink :to="{ name: ROUTE_NAMES.brands }"
      ><Tag :size="21" /><span>Brands</span></RouterLink
    >
    <RouterLink :to="{ name: ROUTE_NAMES.wishlist }"
      ><Heart :size="21" /><span>Wishlist</span></RouterLink
    >
    <RouterLink :to="{ name: ROUTE_NAMES.account }"
      ><UserRound :size="21" /><span>My</span></RouterLink
    >
  </nav>
</template>

<style scoped>
.mobile-bottom-navigation {
  position: fixed;
  z-index: var(--ds-z-sticky);
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  height: 3.125rem;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid #eceff3;
  background: rgb(255 255 255 / 98%);
}

.mobile-bottom-navigation a,
.mobile-bottom-navigation button {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0 0.2rem;
  border: 0;
  color: #97a2b5;
  background: transparent;
  flex-direction: column;
  font-size: 0.625rem;
  line-height: 0.75rem;
  text-decoration: none;
}

.mobile-bottom-navigation a.router-link-active {
  color: #20262f;
}

@media (min-width: 64rem) {
  .mobile-bottom-navigation {
    display: none;
  }
}
</style>
