<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { ref } from 'vue'

import type { HomeProduct } from '@/data/mock/home'

import HomeProductCard from './HomeProductCard.vue'

defineProps<{
  title: string
  products: readonly HomeProduct[]
}>()

const rail = ref<HTMLElement | null>(null)

const scrollProducts = (direction: number) => {
  rail.value?.scrollBy({
    left: direction * rail.value.clientWidth * 0.8,
    behavior: 'smooth',
  })
}
</script>

<template>
  <section class="mt-[clamp(3rem,6vw,5rem)]">
    <h2
      class="font-display mb-8 text-2xl leading-7.5 font-medium lg:mb-7.5 lg:text-4xl lg:leading-10.5"
    >
      {{ title }}
    </h2>
    <div class="relative">
      <button
        class="border-border-soft bg-surface absolute top-[39%] -left-5 z-2 hidden size-10 place-items-center rounded-full border shadow-[0_0.25rem_1rem_rgb(0_0_0/8%)] lg:grid"
        type="button"
        aria-label="Previous products"
        @click="scrollProducts(-1)"
      >
        <ChevronLeft :size="20" />
      </button>
      <div
        ref="rail"
        class="grid snap-x snap-proximity [scrollbar-width:none] auto-cols-[minmax(9rem,45%)] grid-flow-col gap-2 overflow-x-auto lg:auto-cols-[calc((100%-3rem)/4)] lg:gap-4 [&::-webkit-scrollbar]:hidden [&>*]:snap-start"
      >
        <HomeProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <button
        class="border-border-soft bg-surface absolute top-[39%] -right-5 z-2 hidden size-10 place-items-center rounded-full border shadow-[0_0.25rem_1rem_rgb(0_0_0/8%)] lg:grid"
        type="button"
        aria-label="Next products"
        @click="scrollProducts(1)"
      >
        <ChevronRight :size="20" />
      </button>
    </div>
    <RouterLink
      class="border-border-strong text-text mx-auto mt-14 flex min-h-11 w-full max-w-32.5 items-center justify-center rounded-[4px] border text-base font-normal no-underline"
      to="/products"
    >
      Shop Now
    </RouterLink>
  </section>
</template>
