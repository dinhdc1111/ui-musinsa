<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { announcementContent } from '@/constants/navigation'
</script>

<template>
  <aside class="announcement-bar" aria-label="Store announcement">
    <div class="announcement-bar__inner">
      <span>{{ announcementContent.message }}</span>
      <span aria-hidden="true">|</span>
      <RouterLink class="announcement-bar__link" :to="announcementContent.to">
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
  min-height: 2.5rem;
  margin: 0 auto;
  padding: var(--ds-space-2) var(--ds-space-page-gutter);
  font-size: 0.9375rem;
  line-height: var(--ds-type-caption-line-height);
  text-align: center;
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
