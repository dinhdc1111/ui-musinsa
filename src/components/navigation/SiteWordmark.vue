<script setup lang="ts">
import { RouterLink } from 'vue-router'

import musinsaLogo from '@/assets/images/musinsa.svg'
import { ROUTE_NAMES } from '@/constants/routes'

interface Props {
  inverse?: boolean
}

withDefaults(defineProps<Props>(), {
  inverse: false,
})
</script>

<template>
  <RouterLink
    class="site-wordmark"
    :class="{ 'site-wordmark--inverse': inverse }"
    :to="{ name: ROUTE_NAMES.home }"
    aria-label="MUSINSA home"
  >
    <img :src="musinsaLogo" alt="" width="130" height="22" />
  </RouterLink>
</template>

<style scoped>
.site-wordmark {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  text-decoration: none;
}

.site-wordmark img {
  width: 8.125rem;
  height: auto;
}

.site-wordmark--inverse img {
  filter: brightness(0) invert(1);
}
</style>
