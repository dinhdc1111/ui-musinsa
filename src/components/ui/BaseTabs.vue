<script setup lang="ts">
import { computed, useId } from 'vue'

import type { TabItem } from '@/types/ui'

interface Props {
  modelValue: string
  tabs: readonly TabItem[]
  label: string
  variant?: 'underline' | 'pill'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'underline',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const enabledTabs = computed(() => props.tabs.filter((tab) => !tab.disabled))
const activeTab = computed(
  () =>
    props.tabs.find((tab) => tab.id === props.modelValue && !tab.disabled) ?? enabledTabs.value[0],
)

const tabId = (id: string) => `tab-${generatedId}-${id}`
const panelId = `tabpanel-${generatedId}`

const selectTab = (tab: TabItem) => {
  if (!tab.disabled) emit('update:modelValue', tab.id)
}

const focusTab = (tab: TabItem) => {
  selectTab(tab)
  document.getElementById(tabId(tab.id))?.focus()
}

const handleKeydown = (event: KeyboardEvent, currentTab: TabItem) => {
  const tabs = enabledTabs.value
  const currentIndex = tabs.findIndex((tab) => tab.id === currentTab.id)
  if (currentIndex < 0 || tabs.length === 0) return

  let targetTab: TabItem | undefined

  if (event.key === 'ArrowRight') targetTab = tabs[(currentIndex + 1) % tabs.length]
  if (event.key === 'ArrowLeft') targetTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length]
  if (event.key === 'Home') targetTab = tabs[0]
  if (event.key === 'End') targetTab = tabs.at(-1)

  if (targetTab) {
    event.preventDefault()
    focusTab(targetTab)
  }
}
</script>

<template>
  <div class="base-tabs">
    <div
      class="base-tabs__list"
      :class="`base-tabs__list--${variant}`"
      role="tablist"
      :aria-label="label"
    >
      <button
        v-for="tab in tabs"
        :id="tabId(tab.id)"
        :key="tab.id"
        class="base-tabs__tab"
        :class="{ 'base-tabs__tab--active': activeTab?.id === tab.id }"
        type="button"
        role="tab"
        :aria-selected="activeTab?.id === tab.id"
        :aria-controls="panelId"
        :tabindex="activeTab?.id === tab.id ? 0 : -1"
        :disabled="tab.disabled"
        @click="selectTab(tab)"
        @keydown="handleKeydown($event, tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      v-if="activeTab"
      :id="panelId"
      class="base-tabs__panel"
      role="tabpanel"
      :aria-labelledby="tabId(activeTab.id)"
      tabindex="0"
    >
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>

<style scoped>
.base-tabs {
  min-width: 0;
}

.base-tabs__list {
  display: flex;
  gap: var(--ds-space-1);
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: thin;
}

.base-tabs__list--underline {
  border-bottom: 1px solid var(--ds-color-border);
}

.base-tabs__tab {
  position: relative;
  flex: 0 0 auto;
  min-height: 2.75rem;
  padding: 0 var(--ds-space-4);
  border: 0;
  border-radius: var(--ds-radius-control);
  color: var(--ds-color-muted);
  background: transparent;
  font-size: var(--ds-type-label-size);
  font-weight: 700;
  cursor: pointer;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    background-color var(--ds-motion-fast) var(--ds-ease-standard);
}

.base-tabs__tab:hover:not(:disabled) {
  color: var(--ds-color-text);
}

.base-tabs__list--underline .base-tabs__tab--active {
  color: var(--ds-color-text);
}

.base-tabs__list--underline .base-tabs__tab--active::after {
  position: absolute;
  right: var(--ds-space-3);
  bottom: -1px;
  left: var(--ds-space-3);
  height: 2px;
  background: var(--ds-color-accent);
  content: '';
}

.base-tabs__list--pill .base-tabs__tab {
  border-radius: var(--ds-radius-pill);
}

.base-tabs__list--pill .base-tabs__tab--active {
  color: var(--ds-color-accent-contrast);
  background: var(--ds-color-accent);
}

.base-tabs__tab:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.base-tabs__panel {
  padding-top: var(--ds-space-6);
  outline-offset: var(--ds-space-1);
}
</style>
