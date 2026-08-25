<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { announcementContent } from '@/constants/navigation'
</script>

<template>
  <aside class="announcement-bar" aria-label="Store announcement">
    <div class="announcement-bar__inner">
      <span>{{ announcementContent.message }}</span>
      <span v-if="announcementContent.actionLabel" aria-hidden="true">|</span>
      <RouterLink
        v-if="announcementContent.actionLabel"
        class="announcement-bar__link"
        :to="announcementContent.to"
      >
        {{ announcementContent.actionLabel }}
      </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.announcement-bar {
  color: var(--ds-color-text);
  background: #f4f5f6;
}

.announcement-bar__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
  width: min(100%, var(--ds-container-content));
  height: 2.3125rem;
  margin: 0 auto;
  padding: 0 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.0625rem;
  text-align: center;
}

@media (min-width: 64rem) {
  .announcement-bar__inner {
    height: 2.5rem;
    padding-inline: 1.25rem;
    font-size: 0.9375rem;
    line-height: 1.25rem;
  }
}

.announcement-bar__link {
  flex: 0 0 auto;
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 29.999rem) {
  .announcement-bar__inner {
    align-items: flex-start;
    justify-content: space-between;
    text-align: left;
  }
}
</style>
