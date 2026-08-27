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
  <article class="group flex min-w-0 flex-col">
    <RouterLink
      class="bg-product-media relative block aspect-4/5 overflow-hidden"
      :to="`/products/${product.slug}`"
    >
      <img
        class="ease-standard group-hover:scale-102.5 size-full object-cover transition-transform duration-400"
        :src="product.image"
        :alt="product.name"
        loading="lazy"
      />
      <span
        v-if="rank"
        class="bg-accent text-accent-contrast absolute top-0 left-0 grid size-6 place-items-center text-xs font-bold"
      >
        {{ rank }}
      </span>
      <span
        v-if="product.badge"
        class="bg-promotion text-accent-contrast absolute bottom-2 left-2 px-1 py-0.5 text-[0.6875rem] leading-[0.9375rem] font-bold"
      >
        {{ product.badge }}
      </span>
      <Heart
        class="text-accent-contrast absolute right-2 bottom-2 drop-shadow-[0_1px_2px_rgb(0_0_0/45%)]"
        :size="24"
        aria-hidden="true"
      />
    </RouterLink>

    <RouterLink
      class="flex min-w-0 flex-col gap-0 px-0.5 pt-2.5 no-underline"
      :class="{ 'h-30 overflow-hidden': compact }"
      :to="`/products/${product.slug}`"
    >
      <strong class="mb-0.5 shrink-0 truncate text-sm leading-5">{{ product.brand }}</strong>
      <span class="text-label text-muted line-clamp-2 min-h-5 shrink-0 leading-5">
        {{ product.name }}
      </span>
      <span class="mt-1 flex shrink-0 flex-col items-start text-sm leading-5">
        <span v-if="product.originalPrice" class="flex items-baseline gap-1">
          <del class="text-subdued text-xs">{{ formatPrice(product.originalPrice) }}</del>
          <em v-if="product.discount" class="text-price font-normal not-italic">
            {{ product.discount }}%
          </em>
        </span>
        <strong class="text-price">{{ formatPrice(product.price) }}</strong>
      </span>
    </RouterLink>
  </article>
</template>
