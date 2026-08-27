<script setup lang="ts">
import { Check, ChevronRight, Heart, Info, Ruler, Share2, Star } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import kStarsImage from '@/assets/images/home/k-stars.jpg'
import kStylePicksImage from '@/assets/images/home/k-style-picks.jpg'
import officeEditImage from '@/assets/images/home/office-edit.jpg'
import { homeProducts } from '@/data/mock/home'

const route = useRoute()
const activeImage = ref(0)
const selectedColor = ref('Wine')
const selectedSize = ref('M')
const isWishlisted = ref(false)
const cartFeedback = ref('')
const shareFeedback = ref('')

const product = computed(() => {
  const slug = String(route.params.slug ?? '')
  return homeProducts.find((item) => item.slug === slug) ?? homeProducts[16] ?? homeProducts[0]!
})

const galleryImages = computed(() => {
  const images = [product.value.image, kStylePicksImage, officeEditImage, kStarsImage]
  return [...new Set(images)]
})

const couponPrice = computed(() => Math.round((product.value.price * 0.9) / 1000) * 1000)
const earnedPoints = computed(() => Math.max(1, Math.round(couponPrice.value * 0.00004)))

const colors = [
  { label: 'Wine', value: '#641d29' },
  { label: 'Gray', value: '#858585' },
  { label: 'Black', value: '#252525' },
] as const
const sizes = ['S', 'M', 'L', 'XL'] as const

const formatPrice = (amount: number) => `${new Intl.NumberFormat('vi-VN').format(amount)}₫`

const shareProduct = async () => {
  const shareData = { title: product.value.name, url: window.location.href }

  try {
    if (navigator.share) await navigator.share(shareData)
    else await navigator.clipboard.writeText(window.location.href)
    shareFeedback.value = 'Link copied'
  } catch {
    shareFeedback.value = ''
  }
}

const addToCart = () => {
  cartFeedback.value = `${selectedColor.value} / ${selectedSize.value} added to cart`
}

watch(
  () => route.params.slug,
  () => {
    activeImage.value = 0
    cartFeedback.value = ''
  },
)
</script>

<template>
  <div class="product-detail">
    <div class="product-detail__layout">
      <section class="product-gallery" aria-label="Product images">
        <div class="product-gallery__thumbs" aria-label="Select product image">
          <button
            v-for="(image, index) in galleryImages"
            :key="image"
            type="button"
            :class="{ 'product-gallery__thumb--active': activeImage === index }"
            :aria-label="`View product image ${index + 1}`"
            :aria-pressed="activeImage === index"
            @click="activeImage = index"
          >
            <img :src="image" alt="" />
          </button>
        </div>

        <div class="product-gallery__main">
          <img :src="galleryImages[activeImage]" :alt="product.name" />
          <div class="product-gallery__colors" aria-hidden="true">
            <span v-for="color in colors" :key="color.label" :style="{ background: color.value }" />
          </div>
        </div>
      </section>

      <section class="product-info" aria-labelledby="product-title">
        <header class="product-info__brand-row">
          <div class="product-info__brand">
            <span aria-hidden="true">{{ product.brand.charAt(0) }}</span>
            <div>
              <strong>{{ product.brand }}</strong>
              <small>Official Online Store</small>
            </div>
          </div>
          <button
            class="product-info__share"
            type="button"
            aria-label="Share product"
            @click="shareProduct"
          >
            <Share2 :size="20" aria-hidden="true" />
          </button>
          <span class="product-info__share-feedback" aria-live="polite">{{ shareFeedback }}</span>
        </header>

        <div class="product-info__summary">
          <h1 id="product-title">{{ product.name }}</h1>
          <span class="product-info__new">NEW IN</span>
          <a class="product-info__rating" href="#reviews">
            <Star :size="14" fill="currentColor" aria-hidden="true" />
            <strong>4.7</strong>
            <span>3 Reviews</span>
          </a>
        </div>

        <div class="product-info__pricing">
          <del v-if="product.originalPrice">{{ formatPrice(product.originalPrice) }}</del>
          <strong>{{ formatPrice(product.price) }}</strong>
          <div>
            <strong>{{ formatPrice(couponPrice) }}</strong>
            <span>Best Price with Coupon</span>
            <Info :size="14" aria-hidden="true" />
          </div>
        </div>

        <div class="product-info__offer">
          <strong>New member exclusive extra 10% off</strong>
          <span>Get up to 110.000₫ off</span>
        </div>

        <p class="product-info__points">
          Earn up to <strong>{{ earnedPoints }} Points</strong> (worth
          {{ formatPrice(earnedPoints * 265) }})
          <Info :size="14" aria-hidden="true" />
        </p>

        <div class="product-options">
          <fieldset>
            <legend>
              Color <strong>{{ selectedColor }}</strong>
            </legend>
            <button
              v-for="color in colors"
              :key="color.label"
              type="button"
              :class="{ 'product-options__color--active': selectedColor === color.label }"
              :aria-label="color.label"
              :aria-pressed="selectedColor === color.label"
              @click="selectedColor = color.label"
            >
              <span :style="{ background: color.value }" />
              <Check v-if="selectedColor === color.label" :size="13" aria-hidden="true" />
            </button>
          </fieldset>

          <fieldset>
            <legend>
              Size <strong>{{ selectedSize }}</strong>
            </legend>
            <button
              v-for="size in sizes"
              :key="size"
              type="button"
              :class="{ 'product-options__size--active': selectedSize === size }"
              :aria-pressed="selectedSize === size"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </fieldset>
        </div>

        <button class="product-info__size-guide" type="button">
          <Ruler :size="18" aria-hidden="true" />
          <strong>Find your size</strong>
          <ChevronRight :size="18" aria-hidden="true" />
        </button>

        <dl class="product-info__shipping">
          <div>
            <dt>Duties and Taxes</dt>
            <dd>You can check the Duties and Taxes in your shopping cart.</dd>
          </div>
          <div>
            <dt>Estimated Delivery</dt>
            <dd>
              Ships in an average of 9 days.
              <small>※ Within 5–15 days, excluding weekends/holidays</small>
            </dd>
          </div>
          <div>
            <dt>Delivery Information</dt>
            <dd>
              250.000₫<br />Free shipping on orders above 5.000.000₫<br />Postal Delivery
              (International Shipping)
            </dd>
          </div>
          <div>
            <dt>Departure area</dt>
            <dd>Ships from Korea.</dd>
          </div>
        </dl>

        <div class="product-purchase">
          <button
            class="product-purchase__heart"
            type="button"
            :class="{ 'product-purchase__heart--active': isWishlisted }"
            :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
            :aria-pressed="isWishlisted"
            @click="isWishlisted = !isWishlisted"
          >
            <Heart :size="25" :fill="isWishlisted ? 'currentColor' : 'none'" aria-hidden="true" />
          </button>
          <button class="product-purchase__cart" type="button" @click="addToCart">
            ADD TO CART
          </button>
          <p aria-live="polite">{{ cartFeedback }}</p>
        </div>
      </section>
    </div>

    <section id="reviews" class="product-detail__reviews">
      <h2>Product Reviews</h2>
      <div><strong>4.7</strong><span>Based on 3 reviews</span></div>
    </section>
  </div>
</template>

<style scoped>
.product-detail {
  width: min(100%, 74rem);
  margin: 0 auto;
  padding: 2.5rem 1.25rem 7rem;
  color: #11151d;
}

.product-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(22rem, 0.88fr);
  align-items: start;
  gap: clamp(2.5rem, 5vw, 4.75rem);
}

.product-gallery {
  display: grid;
  grid-template-columns: 3.75rem minmax(0, 1fr);
  align-items: start;
  gap: 1rem;
}

.product-gallery__thumbs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-gallery__thumbs button {
  width: 3.75rem;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  padding: 0;
  border: 1px solid transparent;
  background: #f1f2f3;
  cursor: pointer;
}

.product-gallery__thumbs .product-gallery__thumb--active {
  border-color: #111;
}

.product-gallery__thumbs img,
.product-gallery__main > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery__main {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: #eff0f1;
}

.product-gallery__colors {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.product-gallery__colors span {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid rgb(255 255 255 / 65%);
  border-radius: 50%;
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
}

.product-info {
  min-width: 0;
}

.product-info__brand-row {
  position: relative;
  display: flex;
  min-height: 4.125rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eceef0;
}

.product-info__brand {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
}

.product-info__brand > span {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid #e1e3e6;
  border-radius: 50%;
  font-size: 0.6875rem;
  font-weight: 700;
}

.product-info__brand div {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.product-info__brand strong {
  overflow: hidden;
  font-size: 0.9375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-info__brand small {
  color: #777c85;
  font-size: 0.6875rem;
}

.product-info__share {
  display: grid;
  padding: 0.5rem;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.product-info__share-feedback {
  position: absolute;
  right: 2.5rem;
  color: #6a7079;
  font-size: 0.6875rem;
}

.product-info__summary {
  padding-top: 1rem;
}

.product-info__summary h1 {
  margin: 0 0 0.35rem;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.45;
}

.product-info__new {
  display: block;
  width: max-content;
  padding: 0.1rem 0.35rem;
  color: #777;
  background: #f0f0f0;
  font-size: 0.625rem;
}

.product-info__rating {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 1rem;
  font-size: 0.8125rem;
  text-decoration: none;
}

.product-info__rating span {
  color: #7b8088;
  text-decoration: underline;
  text-underline-offset: 0.15rem;
}

.product-info__pricing {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  line-height: 1.35;
}

.product-info__pricing > del {
  color: #8a8e95;
  font-size: 0.8125rem;
}

.product-info__pricing > strong {
  font-size: 1.5rem;
}

.product-info__pricing > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ca2f2a;
}

.product-info__pricing > div strong {
  font-size: 1.25rem;
}

.product-info__pricing > div span {
  font-size: 0.75rem;
}

.product-info__offer {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.1875rem;
  color: #fff;
  background: #4264ef;
  font-size: 0.75rem;
  line-height: 1.1rem;
}

.product-info__offer span {
  font-size: 0.625rem;
}

.product-info__points {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0.875rem 0;
  font-size: 0.75rem;
}

.product-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 0.875rem 0;
  border-top: 1px solid #eceef0;
}

.product-options fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.product-options legend {
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
}

.product-options fieldset button {
  position: relative;
  display: inline-grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  margin-right: 0.35rem;
  padding: 0;
  border: 1px solid #d8dbe0;
  background: #fff;
  font-size: 0.6875rem;
  cursor: pointer;
}

.product-options fieldset .product-options__color--active,
.product-options fieldset .product-options__size--active {
  border-color: #111;
}

.product-options fieldset button > span {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
}

.product-options fieldset button > svg {
  position: absolute;
  color: #fff;
}

.product-info__size-guide {
  display: grid;
  width: 100%;
  min-height: 2.75rem;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0 0.875rem;
  border: 0;
  border-radius: 0.1875rem;
  background: #e9eaec;
  text-align: left;
  cursor: pointer;
}

.product-info__shipping {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin: 1.5rem 0;
  font-size: 0.75rem;
  line-height: 1.35;
}

.product-info__shipping div {
  display: grid;
  grid-template-columns: 7.25rem 1fr;
  gap: 1rem;
}

.product-info__shipping dt,
.product-info__shipping dd {
  margin: 0;
}

.product-info__shipping small {
  display: block;
  color: #8b9098;
  font-size: 0.6875rem;
}

.product-purchase {
  position: sticky;
  z-index: 3;
  bottom: 0;
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 0.75rem;
  padding: 0.75rem 0;
  background: #fff;
}

.product-purchase button {
  min-height: 3rem;
  cursor: pointer;
}

.product-purchase__heart {
  display: grid;
  place-items: center;
  border: 0;
  color: #111;
  background: #fff;
}

.product-purchase__heart--active {
  color: #df342b;
}

.product-purchase__cart {
  border: 0;
  color: #fff;
  background: #10141b;
  font-size: 0.8125rem;
  font-weight: 700;
}

.product-purchase p {
  grid-column: 2;
  min-height: 1rem;
  margin: -0.4rem 0 0;
  color: #24724f;
  font-size: 0.6875rem;
}

.product-purchase p:empty {
  display: none;
}

.product-detail__reviews {
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7ea;
}

.product-detail__reviews h2 {
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: 2rem;
  font-weight: 500;
}

.product-detail__reviews div {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: 1rem;
}

.product-detail__reviews div strong {
  font-size: 2rem;
}

.product-detail__reviews div span {
  color: #777c85;
  font-size: 0.8125rem;
}

@media (max-width: 63.999rem) {
  .product-detail {
    padding: 0 0 8rem;
  }

  .product-detail__layout {
    display: block;
  }

  .product-gallery {
    display: flex;
    flex-direction: column-reverse;
    gap: 0.65rem;
  }

  .product-gallery__main {
    aspect-ratio: 4 / 5;
  }

  .product-gallery__thumbs {
    flex-direction: row;
    overflow-x: auto;
    padding-inline: 0.75rem;
    scrollbar-width: none;
  }

  .product-gallery__thumbs button {
    width: 3.25rem;
    flex: 0 0 3.25rem;
  }

  .product-info {
    padding: 0.75rem;
  }

  .product-options {
    grid-template-columns: 1fr;
  }

  .product-info__shipping div {
    grid-template-columns: 6.25rem 1fr;
    gap: 0.75rem;
  }

  .product-purchase {
    position: fixed;
    right: 0;
    bottom: 3.125rem;
    left: 0;
    margin-inline: 0;
    padding: 0.75rem;
    border-top: 1px solid #e5e7ea;
    box-shadow: 0 -0.35rem 1.25rem rgb(0 0 0 / 8%);
  }

  .product-detail__reviews {
    margin: 3rem 0.75rem 0;
  }
}
</style>
