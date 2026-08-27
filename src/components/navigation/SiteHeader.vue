<script setup lang="ts">
import { Globe, Heart, Search, ShoppingBag, UserRound, X } from '@lucide/vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/routes'

import AnnouncementBar from './AnnouncementBar.vue'
import DesktopNavigation from './DesktopNavigation.vue'
import SiteWordmark from './SiteWordmark.vue'

const router = useRouter()
const searchQuery = ref('')
const showAppBanner = ref(true)

const submitSearch = () => {
  const query = searchQuery.value.trim()

  void router.push({
    name: ROUTE_NAMES.search,
    query: query ? { q: query } : {},
  })
}
</script>

<template>
  <header class="site-header">
    <div v-if="showAppBanner" class="site-header__app-banner">
      <button type="button" aria-label="Close app banner" @click="showAppBanner = false">
        <X :size="16" />
      </button>
      <span class="site-header__app-mark">MUSINSA</span>
      <p>Switch to the app. New members get a 15% coupon.</p>
      <a href="#site-footer">Go to App</a>
    </div>

    <div class="site-header__sticky">
      <div class="site-header__compact site-header__container">
        <RouterLink
          class="site-header__icon-link"
          :to="{ name: ROUTE_NAMES.search }"
          aria-label="Search"
          title="Search"
        >
          <Search :size="20" aria-hidden="true" />
        </RouterLink>

        <SiteWordmark class="site-header__compact-wordmark" />

        <nav class="site-header__compact-actions" aria-label="Quick actions">
          <RouterLink
            class="site-header__icon-link site-header__cart-link"
            :to="{ name: ROUTE_NAMES.cart }"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingBag :size="20" aria-hidden="true" />
            <span class="site-header__cart-count" aria-hidden="true">0</span>
          </RouterLink>
        </nav>
      </div>

      <div class="site-header__desktop site-header__container">
        <form class="site-header__search" role="search" @submit.prevent="submitSearch">
          <Search class="site-header__search-icon" :size="18" aria-hidden="true" />
          <label class="site-header__visually-hidden" for="global-search">Search products</label>
          <input
            id="global-search"
            v-model="searchQuery"
            name="q"
            type="search"
            placeholder="Search"
            autocomplete="off"
          />
        </form>

        <SiteWordmark />

        <nav class="site-header__desktop-actions" aria-label="Account and shopping">
          <RouterLink
            class="site-header__locale"
            :to="{ name: ROUTE_NAMES.home }"
            aria-label="Country and region: Vietnam"
            title="Country and region"
          >
            <Globe :size="22" aria-hidden="true" />
            <span>Vietnam</span>
          </RouterLink>
          <RouterLink
            class="site-header__icon-link"
            :to="{ name: ROUTE_NAMES.wishlist }"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Heart :size="23" aria-hidden="true" />
          </RouterLink>
          <RouterLink
            class="site-header__icon-link site-header__cart-link"
            :to="{ name: ROUTE_NAMES.cart }"
            aria-label="Cart, 0 items"
            title="Cart"
          >
            <ShoppingBag :size="23" aria-hidden="true" />
            <span class="site-header__cart-count" aria-hidden="true">0</span>
          </RouterLink>
          <RouterLink
            class="site-header__icon-link"
            :to="{ name: ROUTE_NAMES.account }"
            aria-label="Account"
            title="Account"
          >
            <UserRound :size="23" aria-hidden="true" />
          </RouterLink>
        </nav>
      </div>

      <AnnouncementBar class="site-header__mobile-announcement" />
      <DesktopNavigation />
    </div>
    <AnnouncementBar class="site-header__desktop-announcement" />
  </header>
</template>

<style scoped>
.site-header {
  display: contents;
  z-index: var(--ds-z-sticky);
  background: var(--ds-color-surface);
}

.site-header__sticky {
  position: sticky;
  z-index: var(--ds-z-sticky);
  top: 0;
  background: #fff;
}

.site-header__app-banner {
  display: grid;
  min-height: 3.5rem;
  grid-template-columns: 1.25rem 2.5rem 1fr auto;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 1rem;
  border-bottom: 1px solid #ededed;
  background: #fff;
}

.site-header__app-banner button {
  display: grid;
  padding: 0;
  border: 0;
  place-items: center;
  background: transparent;
}

.site-header__app-mark {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 0.5rem;
  color: #fff;
  background: #050505;
  font-size: 0.45rem;
  font-weight: 900;
}

.site-header__app-banner p {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.05rem;
}

.site-header__app-banner a {
  display: grid;
  min-height: 1.875rem;
  padding-inline: 0.75rem;
  border-radius: 0.25rem;
  place-items: center;
  color: #fff;
  background: #f04a40;
  font-size: 0.75rem;
  font-weight: 700;
  text-decoration: none;
}

.site-header__container {
  width: min(100%, var(--ds-container-content));
  margin: 0 auto;
  padding-inline: var(--ds-space-page-gutter);
}

.site-header__compact {
  display: grid;
  min-height: 3.125rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding-inline: 0.75rem;
}

.site-header__menu-button {
  justify-self: start;
}

.site-header__compact-wordmark {
  justify-self: center;
}

.site-header__compact-actions,
.site-header__desktop-actions {
  display: flex;
  align-items: center;
  gap: var(--ds-space-1);
}

.site-header__locale {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.5rem;
  color: var(--ds-color-text);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
}

.site-header__cart-link {
  position: relative;
}

.site-header__cart-count {
  position: absolute;
  right: 0.125rem;
  bottom: 0.3125rem;
  display: grid;
  width: 0.9375rem;
  height: 0.9375rem;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #111;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 1;
}

.site-header__compact-actions {
  justify-self: end;
}

.site-header__icon-link {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--ds-radius-control);
  color: var(--ds-color-text);
  text-decoration: none;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    background-color var(--ds-motion-fast) var(--ds-ease-standard);
}

.site-header__icon-link:hover,
.site-header__icon-link.router-link-active {
  background: var(--ds-color-surface-muted);
  color: var(--ds-color-accent);
}

.site-header__desktop {
  display: none;
}

.site-header__desktop-announcement {
  display: none;
}

.site-header__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 64rem) {
  .site-header__app-banner,
  .site-header__mobile-announcement {
    display: none;
  }

  .site-header__desktop-announcement {
    display: block;
  }

  .site-header__container {
    padding-inline: 1.25rem;
  }

  .site-header__compact {
    display: none;
  }

  .site-header__desktop {
    display: grid;
    min-height: 3.75rem;
    grid-template-columns: minmax(15rem, 1fr) auto minmax(15rem, 1fr);
    align-items: center;
    gap: var(--ds-space-8);
  }

  .site-header__search {
    position: relative;
    display: flex;
    width: min(100%, 21.125rem);
    align-items: center;
  }

  .site-header__search-icon {
    position: absolute;
    left: var(--ds-space-3);
    color: #242830;
    pointer-events: none;
  }

  .site-header__search input {
    width: 100%;
    min-height: 2.5rem;
    padding: 0 var(--ds-space-3) 0 2.5rem;
    border: 0;
    border-radius: 0.1875rem;
    background: #f4f5f6;
    color: var(--ds-color-text);
    font: inherit;
    font-size: 0.9375rem;
    transition:
      border-color var(--ds-motion-fast) var(--ds-ease-standard),
      box-shadow var(--ds-motion-fast) var(--ds-ease-standard);
  }

  .site-header__search input::placeholder {
    color: #9299ad;
  }

  .site-header__search input:focus-visible {
    border-color: var(--ds-color-focus);
    outline: 0;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--ds-color-focus) 20%, transparent);
  }

  .site-header__desktop-actions {
    justify-self: end;
    gap: 0.125rem;
  }
}
</style>
