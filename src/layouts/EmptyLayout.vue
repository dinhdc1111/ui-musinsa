<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="site-layout site-layout--empty">
    <main id="main-content" class="site-layout__main">
      <RouterView />
    </main>
  </div>
</template>
