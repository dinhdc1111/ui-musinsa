<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'
</script>

<template>
  <div class="site-layout site-layout--auth">
    <RouterLink class="site-layout__brand" :to="{ name: ROUTE_NAMES.home }">
      Fashion Storefront
    </RouterLink>
    <main id="main-content" class="site-layout__main">
      <RouterView />
    </main>
  </div>
</template>
