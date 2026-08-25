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
  <section class="product-rail">
    <h2>{{ title }}</h2>
    <div class="product-rail__body">
      <button
        class="product-rail__arrow product-rail__arrow--left"
        type="button"
        aria-label="Previous products"
        @click="scrollProducts(-1)"
      >
        <ChevronLeft :size="20" />
      </button>
      <div ref="rail" class="product-rail__grid">
        <HomeProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
      <button
        class="product-rail__arrow product-rail__arrow--right"
        type="button"
        aria-label="Next products"
        @click="scrollProducts(1)"
      >
        <ChevronRight :size="20" />
      </button>
    </div>
    <RouterLink class="product-rail__more" to="/products">Shop Now</RouterLink>
  </section>
</template>

<style scoped>
.product-rail {
  margin-top: clamp(3rem, 6vw, 5rem);
}

.product-rail h2 {
  margin: 0 0 1.25rem;
  font-family: var(--ds-font-display);
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
}

.product-rail__body {
  position: relative;
}

.product-rail__grid {
  display: grid;
  overflow-x: auto;
  grid-auto-columns: minmax(9rem, 45%);
  grid-auto-flow: column;
  gap: 0.5rem;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
}

.product-rail__grid::-webkit-scrollbar {
  display: none;
}

.product-rail__grid > * {
  scroll-snap-align: start;
}

.product-rail__arrow {
  position: absolute;
  z-index: 2;
  top: 39%;
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.25rem 1rem rgb(0 0 0 / 8%);
}

.product-rail__arrow--left {
  left: -1.25rem;
}

.product-rail__arrow--right {
  right: -1.25rem;
}

.product-rail__more {
  display: flex;
  width: min(100%, 10rem);
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  margin: 1.75rem auto 0;
  border: 1px solid #999;
  color: #111;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
}

@media (min-width: 48rem) {
  .product-rail__grid {
    grid-auto-columns: calc((100% - 2.25rem) / 4);
    grid-auto-flow: column;
    grid-template-columns: none;
    gap: 0.75rem;
  }

  .product-rail__arrow {
    display: grid;
  }
}
</style>
