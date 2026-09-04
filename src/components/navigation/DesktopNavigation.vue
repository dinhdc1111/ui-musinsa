<script setup lang="ts">
import { Menu } from '@lucide/vue'
import { RouterLink } from 'vue-router'

import { primaryNavigation } from '@/constants/navigation'
</script>

<template>
  <nav class="desktop-navigation" aria-label="Primary navigation">
    <div class="desktop-navigation__inner">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.id"
        class="desktop-navigation__link"
        active-class="desktop-navigation__link--active"
        :to="{ name: item.routeName }"
      >
        <span v-if="item.badge" class="desktop-navigation__badge">{{ item.badge }}</span>
        <span class="desktop-navigation__label">
          <Menu v-if="item.id === 'nav-category'" :size="20" aria-hidden="true" />
          {{ item.label }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.desktop-navigation {
  display: block;
  overflow: hidden;
  background: var(--ds-color-surface);
}

.desktop-navigation__inner {
  display: flex;
  justify-content: flex-start;
  gap: 1.25rem;
  width: min(100%, var(--ds-container-content));
  margin: 0 auto;
  overflow-x: auto;
  padding: 0 1rem;
  scrollbar-width: none;
}

.desktop-navigation__inner::-webkit-scrollbar {
  display: none;
}

.desktop-navigation__link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  color: var(--ds-color-text);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  text-decoration: none;
  transition: color var(--ds-motion-fast) var(--ds-ease-standard);
  white-space: nowrap;
}

.desktop-navigation__link:hover,
.desktop-navigation__link--active {
  color: var(--ds-color-text);
}

.desktop-navigation__link:not(:first-child)::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--ds-color-accent);
  content: '';
  transform: scaleX(0);
  transform-origin: center;
  transition: transform var(--ds-motion-fast) var(--ds-ease-standard);
}

.desktop-navigation__link:not(:first-child):hover::after,
.desktop-navigation__link:not(:first-child).desktop-navigation__link--active::after {
  transform: scaleX(1);
}

.desktop-navigation__label {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  text-transform: uppercase;
}

.desktop-navigation__link:first-child {
  display: none;
}

.desktop-navigation__link:first-child::before {
  position: absolute;
  top: 50%;
  right: -1.375rem;
  width: 1px;
  height: 1rem;
  background: var(--ds-color-border-strong);
  content: '';
  transform: translateY(-50%);
}

.desktop-navigation__badge {
  position: absolute;
  top: 0.25rem;
  left: 50%;
  color: var(--ds-color-sale);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
  transform: translateX(-50%);
}

@media (max-width: 63.999rem) {
  .desktop-navigation__link:nth-child(2) .desktop-navigation__label {
    text-transform: none;
  }
}

.desktop-navigation__link:nth-child(2) .desktop-navigation__label {
  text-transform: none;
}

@media (min-width: 64rem) {
  .desktop-navigation__inner {
    gap: 2rem;
    overflow: visible;
    padding-inline: 1.25rem;
  }

  .desktop-navigation__link:first-child {
    display: flex;
    margin-right: 2.125rem;
  }

  .desktop-navigation__link {
    min-height: 3.75rem;
    font-size: 0.9375rem;
  }

  .desktop-navigation__link:first-child::before {
    right: -2.0625rem;
  }
}
</style>
