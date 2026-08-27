<script setup lang="ts">
import {
  BadgePercent,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Coins,
  Globe2,
  SearchCheck,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Timer,
  Truck,
  // X,
} from '@lucide/vue'
import { A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import { ref, type Component } from 'vue'
import { RouterLink } from 'vue-router'

import 'swiper/css'

import HomeProductCard from '@/components/home/HomeProductCard.vue'
import HomeProductRail from '@/components/home/HomeProductRail.vue'
import {
  campaignTiles,
  heroCampaigns,
  homeProducts,
  hotTopics,
  popularBrands,
} from '@/data/mock/home'

const heroIndex = ref(0)
const heroSwiper = ref<SwiperInstance>()
const selectedFilter = ref('All')
// const showWelcomeOffer = ref(true)

const heroModules = [Autoplay, A11y]
const reduceHeroMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const heroAutoplay = reduceHeroMotion
  ? false
  : {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }

const navigateHero = (direction: number) => {
  if (direction < 0) heroSwiper.value?.slidePrev()
  else heroSwiper.value?.slideNext()
}

const handleHeroFocusIn = () => {
  heroSwiper.value?.autoplay?.pause()
}

const handleHeroFocusOut = (event: FocusEvent) => {
  const nextTarget = event.relatedTarget
  const currentTarget = event.currentTarget

  if (currentTarget instanceof HTMLElement && nextTarget instanceof Node) {
    if (currentTarget.contains(nextTarget)) return
  }

  heroSwiper.value?.autoplay?.resume()
}

const handleHeroSwiper = (swiper: SwiperInstance) => {
  heroSwiper.value = swiper
}

const handleHeroIndexChange = (swiper: SwiperInstance) => {
  heroIndex.value = swiper.realIndex
}

const utilityShortcuts = [
  { id: 'brand-day', label: 'Brand Day: Extra 20% Off' },
  { id: 'sale', label: '72-Hour Sale' },
  { id: 'trending', label: 'Trending Keywords' },
  { id: 'spotlight', label: 'Spotlight Item' },
  { id: 'global', label: 'Global Ranking' },
  { id: 'korea', label: 'Korea Ranking' },
  { id: 'points', label: 'Bonus Point' },
  { id: 'time', label: 'Time Sale' },
  { id: 'all', label: 'View All Sales' },
] as const

const shortcutIconById: Record<(typeof utilityShortcuts)[number]['id'], Component> = {
  'brand-day': Shirt,
  sale: Clock3,
  trending: Sparkles,
  spotlight: Star,
  global: Globe2,
  korea: SearchCheck,
  points: Coins,
  time: Timer,
  all: BadgePercent,
}

const filters = ['All', 'Pants', 'Dresses & Skirts', 'Outerwear', 'Bags', 'Shoes'] as const
const firstHaulProducts = homeProducts.slice(0, 8)
const trendingProducts = homeProducts.slice(4, 12)
const reviewProducts = [...homeProducts.slice(12), ...homeProducts.slice(0, 2)]
const saleProducts = homeProducts.slice(2, 14)
</script>

<template>
  <div class="home-page">
    <section
      class="home-hero"
      aria-label="Featured campaigns"
      aria-roledescription="carousel"
      @focusin="handleHeroFocusIn"
      @focusout="handleHeroFocusOut"
    >
      <Swiper
        class="home-hero__carousel"
        :modules="heroModules"
        :slides-per-view="1"
        :space-between="8"
        :speed="650"
        :loop="true"
        :autoplay="heroAutoplay"
        :breakpoints="{ 1024: { slidesPerView: 3 } }"
        :a11y="{ enabled: true }"
        @swiper="handleHeroSwiper"
        @real-index-change="handleHeroIndexChange"
      >
        <SwiperSlide v-for="campaign in heroCampaigns" :key="campaign.id">
          <RouterLink class="home-hero__card" :to="campaign.to">
            <img
              :src="campaign.image"
              :alt="campaign.title"
              :style="campaign.position ? { objectPosition: campaign.position } : undefined"
            />
            <span class="home-hero__shade" />
            <span class="home-hero__copy">
              <strong>{{ campaign.title }}</strong>
              <span>{{ campaign.subtitle }}</span>
            </span>
          </RouterLink>
        </SwiperSlide>
      </Swiper>

      <button
        class="home-hero__arrow home-hero__arrow--left"
        type="button"
        aria-label="Previous campaign"
        @click="navigateHero(-1)"
      >
        <ChevronLeft :size="22" aria-hidden="true" />
      </button>
      <button
        class="home-hero__arrow home-hero__arrow--right"
        type="button"
        aria-label="Next campaign"
        @click="navigateHero(1)"
      >
        <ChevronRight :size="22" aria-hidden="true" />
      </button>

      <span class="home-hero__mobile-counter"
        >{{ heroIndex + 1 }} / {{ heroCampaigns.length }}</span
      >
    </section>

    <section class="campaign-shortcuts" aria-label="Featured offers">
      <div class="campaign-shortcuts__tiles">
        <RouterLink v-for="tile in campaignTiles" :key="tile.id" to="/sale">
          <img :src="tile.image" alt="" />
          <span>{{ tile.label }}</span>
        </RouterLink>
      </div>

      <div class="campaign-shortcuts__utilities">
        <RouterLink v-for="shortcut in utilityShortcuts" :key="shortcut.id" to="/sale">
          <component :is="shortcutIconById[shortcut.id]" :size="17" aria-hidden="true" />
          <span>{{ shortcut.label }}</span>
        </RouterLink>
      </div>
    </section>

    <section class="home-section welcome-section">
      <div class="home-section__heading-row">
        <h2>Welcome to MUSINSA</h2>
        <!-- <div v-if="showWelcomeOffer" class="welcome-section__offer">
          <span>Sign up in seconds and unlock exclusive welcome offers.</span>
          <RouterLink to="/register">Get Offer</RouterLink>
          <button type="button" aria-label="Dismiss offer" @click="showWelcomeOffer = false">
            <X :size="15" />
          </button>
        </div> -->
      </div>

      <div class="welcome-section__grid">
        <article class="welcome-card welcome-card--brands">
          <div class="welcome-card__visual">
            <span>M. MARGIELA</span>
            <span>MM6</span>
            <span>LOW CLASSIC</span>
            <span>ARCHIVE BOLD</span>
            <span>MARITHÉ</span>
            <span>ROCKCAKE</span>
          </div>
          <h3>300+ Popular K-Fashion Brands</h3>
          <p>A curated selection of popular K-fashion brands loved worldwide.</p>
        </article>

        <article class="welcome-card">
          <div class="welcome-card__visual welcome-card__visual--icon">
            <ShoppingBag :size="92" stroke-width="1.25" />
            <CheckCircle class="welcome-card__check" :size="36" fill="#1769ff" color="#fff" />
          </div>
          <h3>100% Authentic Guarantee</h3>
          <p>We guarantee that all products are authentic.</p>
        </article>

        <article class="welcome-card">
          <div class="welcome-card__visual welcome-card__visual--icon">
            <Truck :size="104" stroke-width="1.25" color="#1769ff" />
          </div>
          <h3>Safe &amp; Free Shipping</h3>
          <p>Safe and reliable international shipping.</p>
        </article>
      </div>
    </section>

    <section class="home-section hot-topics">
      <h2>MUSINSA STANDARD : HOT TOPICS</h2>
      <div class="hot-topics__grid">
        <RouterLink v-for="topic in hotTopics" :key="topic.id" to="/brands/musinsa-standard">
          <span class="hot-topics__image"
            ><img :src="topic.image" :alt="topic.title" loading="lazy"
          /></span>
          <strong>{{ topic.title }}</strong>
          <span>{{ topic.subtitle }}</span>
        </RouterLink>
      </div>
    </section>

    <HomeProductRail title="Top 200 for Your First MUSINSA Haul" :products="firstHaulProducts" />
    <HomeProductRail title="Trending Now" :products="trendingProducts" />

    <section class="home-section favorites-section">
      <h2>Seoul's Favorites</h2>
      <div class="favorites-section__filters" aria-label="Product categories">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          :class="{ 'favorites-section__filter--active': selectedFilter === filter }"
          @click="selectedFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
      <div class="favorites-section__grid">
        <HomeProductCard
          v-for="(product, index) in homeProducts"
          :key="product.id"
          :product="product"
          :rank="index + 1"
          compact
        />
      </div>
      <RouterLink class="home-section__outline-link" to="/best">View More Best Sellers</RouterLink>
    </section>

    <section class="home-section brand-shops">
      <h2>Explore Popular Brand Shops</h2>
      <div class="brand-shops__grid">
        <RouterLink v-for="brand in popularBrands" :key="brand" to="/brands">
          {{ brand }}
        </RouterLink>
      </div>
    </section>

    <HomeProductRail title="Top 200 Items with the Most Reviews" :products="reviewProducts" />

    <section class="home-section sale-section">
      <h2>Extra Off: Sale + Welcome Code</h2>
      <div class="favorites-section__filters" aria-label="Sale categories">
        <button class="favorites-section__filter--active" type="button">All</button>
        <button v-for="filter in filters.slice(1)" :key="filter" type="button">{{ filter }}</button>
      </div>
      <div class="sale-section__grid">
        <HomeProductCard
          v-for="product in saleProducts"
          :key="product.id"
          :product="product"
          compact
        />
      </div>
      <RouterLink class="home-section__outline-link" to="/sale">Shop Now</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  width: min(100%, var(--ds-container-content));
  margin: 0 auto;
  padding: 1.25rem 1.25rem 7.5rem;
  color: #0a0f18;
  background: #fff;
}

.home-page__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.home-hero {
  position: relative;
}

.home-hero__carousel {
  overflow: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.home-hero__carousel :deep(.swiper-wrapper) {
  align-items: stretch;
  transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}

.home-hero__carousel :deep(.swiper-slide) {
  height: auto;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.home-hero__card {
  position: relative;
  display: block;
  height: clamp(18rem, 28vw, 22.375rem);
  overflow: hidden;
  border-radius: 0.25rem;
  color: #fff;
  background: #111;
}

.home-hero__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms var(--ds-ease-standard);
}

.home-hero__card:hover img {
  transform: scale(1.025);
}

.home-hero__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgb(0 0 0 / 58%));
}

.home-hero__copy {
  position: absolute;
  right: 1.5rem;
  bottom: 1.25rem;
  left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.home-hero__copy strong {
  font-family: var(--ds-font-display);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.875rem;
}

.home-hero__copy span {
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.0625rem;
}

.home-hero__arrow {
  position: absolute;
  z-index: 2;
  top: 50%;
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0.35rem 1.25rem rgb(0 0 0 / 12%);
  cursor: pointer;
  transform: translateY(-50%);
}

.home-hero__arrow--left {
  left: -1.5rem;
}

.home-hero__arrow--right {
  right: -1.5rem;
}

.home-hero__mobile-counter {
  display: none;
}

.campaign-shortcuts {
  padding-top: 0.875rem;
}

.campaign-shortcuts__tiles,
.campaign-shortcuts__utilities {
  display: flex;
  max-width: 72rem;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-inline: auto;
  scrollbar-width: none;
}

.campaign-shortcuts__tiles::-webkit-scrollbar,
.campaign-shortcuts__utilities::-webkit-scrollbar {
  display: none;
}

.campaign-shortcuts__tiles {
  justify-content: center;
}

.campaign-shortcuts__tiles a {
  position: relative;
  display: flex;
  width: 8.75rem;
  min-width: 8.75rem;
  height: 3.75rem;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  padding: 0;
  border: 1px solid #d6d6d6;
  border-radius: 0.25rem;
  color: #111;
  background: #e9e9e9;
  font-size: 0.6875rem;
  text-align: center;
  text-decoration: none;
}

.campaign-shortcuts__tiles img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.campaign-shortcuts__tiles span {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 1.25rem 0.375rem 0.375rem;
  background: linear-gradient(180deg, transparent, rgb(255 255 255 / 90%));
  line-height: 0.875rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
}

.campaign-shortcuts__utilities {
  justify-content: center;
  margin-top: 0.4rem;
}

.campaign-shortcuts__utilities a {
  display: inline-flex;
  min-width: max-content;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  color: #111;
  font-size: 0.75rem;
  text-decoration: none;
}

.home-section {
  margin-top: clamp(3rem, 6vw, 5rem);
}

.welcome-section {
  margin-top: 3rem;
}

.home-section h2,
.home-section__heading-row h2 {
  margin: 0 0 1.875rem;
  font-family: var(--ds-font-display);
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2.625rem;
}

.home-section__heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.welcome-section .home-section__heading-row h2 {
  margin-bottom: 3.125rem;
}

.hot-topics > h2 {
  margin-bottom: 3.0625rem;
}

.welcome-section__offer {
  display: flex;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 0.5rem 0.75rem;
  color: #fff;
  background: #111;
  font-size: 0.6875rem;
}

.welcome-section__offer a {
  color: #fff;
  font-weight: 700;
}

.welcome-section__offer button {
  display: grid;
  padding: 0;
  border: 0;
  color: #fff;
  background: transparent;
  cursor: pointer;
}

.welcome-section__grid,
.hot-topics__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.welcome-section__grid {
  grid-template-columns: repeat(3, calc((100% - 2.25rem) / 3));
}

.welcome-card__visual {
  position: relative;
  display: flex;
  min-height: 0;
  aspect-ratio: 3 / 2;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1rem;
  padding: 2rem;
  overflow: hidden;
  color: #fff;
  background: #0b0b0b;
  font-family: var(--ds-font-display);
  font-size: clamp(0.8rem, 1.5vw, 1.35rem);
  font-weight: 700;
}

.welcome-card__visual--icon {
  color: #111;
  background: #f1f3f5;
}

.welcome-card__check {
  position: absolute;
  top: 55%;
  left: 54%;
}

.welcome-card h3 {
  margin: 0;
  padding: 0.75rem 0.25rem 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
}

.welcome-card p {
  margin: 0;
  padding-inline: 0.25rem;
  overflow: hidden;
  color: #0a0f18;
  font-size: 1rem;
  line-height: 1.375rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hot-topics__grid a {
  display: flex;
  min-width: 0;
  flex-direction: column;
  color: #111;
  font-size: 1rem;
  line-height: 1.375rem;
  text-decoration: none;
}

.hot-topics__image {
  display: block;
  aspect-ratio: 3 / 2;
  margin-bottom: 0.75rem;
  overflow: hidden;
  background: #f3f3f3;
}

.hot-topics__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 400ms var(--ds-ease-standard);
}

.hot-topics__grid a:hover img {
  transform: scale(1.025);
}

.hot-topics__grid a > span:last-child {
  margin-top: 0;
  color: #666;
  font-size: 1rem;
}

.favorites-section__filters {
  display: flex;
  overflow-x: auto;
  gap: 0.4rem;
  margin: 0 0 2rem;
  scrollbar-width: none;
}

.favorites-section__filters button {
  min-width: max-content;
  min-height: 2rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid #d8d8d8;
  border-radius: 999px;
  color: #555;
  background: #fff;
  font-size: 0.6875rem;
  cursor: pointer;
}

.favorites-section__filters .favorites-section__filter--active {
  border-color: #111;
  color: #fff;
  background: #111;
}

.favorites-section__grid,
.sale-section__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1.5rem 1rem;
}

.home-section__outline-link {
  display: flex;
  width: min(100%, 12.25rem);
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  margin: 3.75rem auto 0;
  border: 1px solid #999;
  color: #111;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
}

.brand-shops__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 2.5rem;
}

.brand-shops__grid a {
  display: flex;
  min-height: 4.5625rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-bottom: 1px solid #e1e4e8;
  color: #171b24;
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
}

.brand-shops__grid a:nth-last-child(-n + 2) {
  border-bottom: 0;
}

@media (max-width: 63.999rem) {
  .home-page {
    padding: 0 0 3.5rem;
    overflow: hidden;
  }

  .home-hero {
    padding-inline: 1rem;
  }

  .home-hero__card {
    display: block;
    height: auto;
    aspect-ratio: 408 / 358;
  }

  .home-hero__copy {
    right: 1rem;
    bottom: 1rem;
    left: 1rem;
  }

  .home-hero__copy strong {
    max-width: 19rem;
    font-size: 1.5rem;
    line-height: 1.875rem;
  }

  .home-hero__arrow {
    width: 2.5rem;
    height: 2.5rem;
  }

  .home-hero__arrow--left {
    left: 0.25rem;
  }

  .home-hero__arrow--right {
    right: 0.25rem;
  }

  .home-hero__mobile-counter {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    display: block;
    padding: 0.2rem 0.4rem;
    color: #fff;
    background: rgb(0 0 0 / 55%);
    font-size: 0.625rem;
  }

  .campaign-shortcuts {
    padding-top: 1rem;
  }

  .campaign-shortcuts__tiles,
  .campaign-shortcuts__utilities {
    max-width: none;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    padding-inline: 1rem;
  }

  .campaign-shortcuts__tiles a {
    width: 8.75rem;
    min-width: 8.75rem;
    height: 3.75rem;
    padding: 0;
    font-size: 0.6875rem;
    line-height: 0.875rem;
  }

  .campaign-shortcuts__utilities a {
    min-height: 2.375rem;
    padding: 0.3125rem 0.5rem 0.3125rem 0.375rem;
    font-size: 0.8125rem;
    line-height: 1.0625rem;
  }

  .home-section,
  :deep(.product-rail) {
    margin-top: 3.125rem;
    padding-inline: 0.75rem;
  }

  .welcome-section {
    margin-top: 2rem;
  }

  .welcome-section .home-section__heading-row h2 {
    margin-bottom: 2rem;
  }

  .hot-topics > h2 {
    margin-bottom: 2rem;
  }

  .home-section h2,
  .home-section__heading-row h2,
  :deep(.product-rail h2) {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.875rem;
  }

  .home-section__heading-row {
    display: block;
  }

  .welcome-section__offer {
    margin: 0 0 0.75rem;
  }

  .welcome-section__grid,
  .hot-topics__grid {
    display: grid;
    overflow-x: auto;
    grid-auto-columns: calc(100vw - 3.125rem);
    grid-auto-flow: column;
    grid-template-columns: none;
    gap: 0.5rem;
    margin-inline: -0.75rem;
    padding-inline: 0.75rem;
    scrollbar-width: none;
  }

  .welcome-section__grid {
    grid-template-columns: none;
  }

  .welcome-card__visual,
  .hot-topics__image {
    min-height: 0;
    height: auto;
    aspect-ratio: 3 / 2;
  }

  .favorites-section__grid,
  .sale-section__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem 0.25rem;
  }

  .favorites-section__filters {
    margin-bottom: 1rem;
  }

  .home-section__outline-link {
    margin-top: 2rem;
    font-size: 0.75rem;
  }

  .brand-shops__grid {
    grid-template-columns: 1fr;
    column-gap: 0;
  }

  .brand-shops__grid a {
    min-height: 3.5rem;
    border-bottom: 1px solid #e1e4e8;
    font-size: 1rem;
    line-height: 1.375rem;
  }

  .brand-shops__grid a:last-child {
    border-bottom: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__carousel :deep(.swiper-wrapper) {
    transition-duration: 1ms !important;
  }
}
</style>
