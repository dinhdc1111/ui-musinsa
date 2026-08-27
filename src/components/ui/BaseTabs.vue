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

const listClasses = computed(() => (props.variant === 'underline' ? 'border-b border-border' : ''))

const tabClasses = (tab: TabItem) => {
  const isActive = activeTab.value?.id === tab.id

  if (props.variant === 'pill') {
    return [
      'rounded-pill',
      isActive ? 'bg-accent text-accent-contrast' : 'text-muted hover:not-disabled:text-text',
    ]
  }

  return [
    isActive
      ? "text-text after:absolute after:right-3 after:-bottom-px after:left-3 after:h-0.5 after:bg-accent after:content-['']"
      : 'text-muted hover:not-disabled:text-text',
  ]
}

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
  <div class="min-w-0">
    <div
      class="flex max-w-full [scrollbar-width:thin] gap-1 overflow-x-auto"
      :class="listClasses"
      role="tablist"
      :aria-label="label"
    >
      <button
        v-for="tab in tabs"
        :id="tabId(tab.id)"
        :key="tab.id"
        class="rounded-control text-label relative min-h-11 flex-none cursor-pointer border-0 bg-transparent px-4 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        :class="tabClasses(tab)"
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
      class="pt-6 outline-offset-1"
      role="tabpanel"
      :aria-labelledby="tabId(activeTab.id)"
      tabindex="0"
    >
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>
