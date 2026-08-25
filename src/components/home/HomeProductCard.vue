<script setup lang="ts">
import { Heart } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import type { HomeProduct } from '@/data/mock/home'

interface Props {
  product: HomeProduct
  rank?: number
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  rank: undefined,
  compact: false,
})

const formatPrice = (amount: number) => `${new Intl.NumberFormat('vi-VN').format(amount)}₫`
</script>

<template>
  <article class="home-product" :class="{ 'home-product--compact': compact }">
    <RouterLink class="home-product__media" :to="`/products/${product.slug}`">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <span v-if="rank" class="home-product__rank">{{ rank }}</span>
      <span v-if="product.badge" class="home-product__badge">{{ product.badge }}</span>
      <Heart class="home-product__heart" :size="24" aria-hidden="true" />
    </RouterLink>

    <RouterLink class="home-product__details" :to="`/products/${product.slug}`">
      <strong class="home-product__brand">{{ product.brand }}</strong>
      <span class="home-product__name">{{ product.name }}</span>
      <span class="home-product__prices">
        <span v-if="product.originalPrice" class="home-product__original-row">
          <del>{{ formatPrice(product.originalPrice) }}</del>
          <em v-if="product.discount">{{ product.discount }}%</em>
        </span>
        <strong>{{ formatPrice(product.price) }}</strong>
      </span>
    </RouterLink>
  </article>
</template>

<style scoped>
.home-product {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.home-product__media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: #f4f4f4;
}

.home-product__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms var(--ds-ease-standard);
}

.home-product:hover .home-product__media img {
  transform: scale(1.025);
}

.home-product__rank {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  color: #fff;
  background: #111;
  font-size: 0.75rem;
  font-weight: 700;
}

.home-product__badge {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  padding: 0.125rem 0.25rem;
  color: #fff;
  background: #f04a40;
  font-size: 0.6875rem;
  line-height: 0.9375rem;
  font-weight: 700;
}

.home-product__heart {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  color: #fff;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 45%));
}

.home-product__details {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0;
  padding: 0.625rem 0.125rem 0;
  text-decoration: none;
}

.home-product__brand {
  overflow: hidden;
  margin-bottom: 0.125rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.home-product__name {
  display: -webkit-box;
  min-height: 1.0625rem;
  overflow: hidden;
  color: #555;
  font-size: 0.8125rem;
  line-height: 1.0625rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.home-product__prices {
  display: flex;
  align-items: flex-start;
  margin-top: 0.25rem;
  flex-direction: column;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.home-product__original-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.home-product__prices strong,
.home-product__prices em {
  color: #df342b;
  font-style: normal;
}

.home-product__prices del {
  color: #888;
  font-size: 0.75rem;
}

.home-product--compact .home-product__details {
  height: 5.4375rem;
  padding-top: 0.625rem;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .home-product__brand,
  .home-product__prices {
    font-size: 0.875rem;
  }
}
</style>
