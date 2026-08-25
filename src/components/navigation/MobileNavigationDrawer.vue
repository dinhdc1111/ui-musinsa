<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import BaseDivider from '@/components/ui/BaseDivider.vue'
import BaseDrawer from '@/components/ui/BaseDrawer.vue'
import { accountNavigation, primaryNavigation } from '@/constants/navigation'
import { ROUTE_NAMES } from '@/constants/routes'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const closeDrawer = () => {
  isOpen.value = false
}
</script>

<template>
  <BaseDrawer v-model="isOpen" side="left" size="md" title="Browse">
    <nav class="mobile-navigation" aria-label="Mobile navigation">
      <RouterLink
        v-for="item in primaryNavigation"
        :key="item.id"
        class="mobile-navigation__primary-link"
        active-class="mobile-navigation__link--active"
        :to="{ name: item.routeName }"
        @click="closeDrawer"
      >
        {{ item.label }}
      </RouterLink>

      <BaseDivider />

      <RouterLink
        class="mobile-navigation__secondary-link"
        active-class="mobile-navigation__link--active"
        :to="{ name: ROUTE_NAMES.search }"
        @click="closeDrawer"
      >
        Search
      </RouterLink>
      <RouterLink
        v-for="item in accountNavigation"
        :key="item.id"
        class="mobile-navigation__secondary-link"
        active-class="mobile-navigation__link--active"
        :to="{ name: item.routeName }"
        @click="closeDrawer"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <template #footer>
      <p class="mobile-navigation__note">Vietnam · VND</p>
    </template>
  </BaseDrawer>
</template>

<style scoped>
.mobile-navigation {
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-1);
}

.mobile-navigation__primary-link,
.mobile-navigation__secondary-link {
  display: flex;
  min-height: 2.75rem;
  align-items: center;
  padding: var(--ds-space-2) var(--ds-space-3);
  border-radius: var(--ds-radius-control);
  color: var(--ds-color-text);
  text-decoration: none;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    background-color var(--ds-motion-fast) var(--ds-ease-standard);
}

.mobile-navigation__primary-link {
  font-family: var(--ds-font-display);
  font-size: 1.5rem;
  line-height: 1.2;
}

.mobile-navigation__secondary-link {
  font-size: var(--ds-type-label-size);
  font-weight: 700;
}

.mobile-navigation__primary-link:hover,
.mobile-navigation__secondary-link:hover,
.mobile-navigation__link--active {
  background: var(--ds-color-surface-muted);
  color: var(--ds-color-accent);
}

.mobile-navigation__note {
  margin: 0;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-caption-size);
}
</style>
