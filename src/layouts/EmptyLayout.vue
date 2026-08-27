<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-canvas flex min-h-screen flex-col">
    <main id="main-content" class="grid min-h-0 flex-1 place-items-center">
      <RouterView />
    </main>
  </div>
</template>
