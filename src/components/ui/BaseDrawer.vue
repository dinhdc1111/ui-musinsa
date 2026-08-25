<script setup lang="ts">
import { X } from '@lucide/vue'
import { computed, ref, useId } from 'vue'

import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import { useOverlayFocus } from '@/composables/useOverlayFocus'

interface Props {
  modelValue: boolean
  title: string
  description?: string
  side?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
  side: 'right',
  size: 'md',
  closeOnBackdrop: true,
  closeOnEscape: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const panelRef = ref<HTMLElement | null>(null)
const isOpen = computed(() => props.modelValue)
const generatedId = useId()
const titleId = `drawer-title-${generatedId}`
const descriptionId = `drawer-description-${generatedId}`

const requestClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const { onKeydown } = useOverlayFocus({
  isOpen,
  panelRef,
  closeOnEscape: () => props.closeOnEscape,
  requestClose,
})

const handleBackdrop = (event: MouseEvent) => {
  if (props.closeOnBackdrop && event.target === event.currentTarget) requestClose()
}
</script>

<template>
  <Teleport to="body">
    <Transition :name="`drawer-${side}`">
      <div v-if="modelValue" class="drawer-backdrop" @mousedown="handleBackdrop">
        <aside
          ref="panelRef"
          class="drawer-panel"
          :class="[`drawer-panel--${side}`, `drawer-panel--${size}`]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header class="drawer-panel__header">
            <div>
              <h2 :id="titleId" class="drawer-panel__title">{{ title }}</h2>
              <p v-if="description" :id="descriptionId" class="drawer-panel__description">
                {{ description }}
              </p>
            </div>
            <BaseIconButton label="Close drawer" size="sm" @click="requestClose">
              <X :size="18" />
            </BaseIconButton>
          </header>
          <div class="drawer-panel__body"><slot /></div>
          <footer v-if="$slots.footer" class="drawer-panel__footer"><slot name="footer" /></footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  z-index: var(--ds-z-drawer);
  inset: 0;
  background: var(--ds-color-overlay);
}

.drawer-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(100%, var(--drawer-width));
  outline: none;
  background: var(--ds-color-surface);
  box-shadow: var(--ds-shadow-overlay);
}

.drawer-panel--left {
  left: 0;
}

.drawer-panel--right {
  right: 0;
}

.drawer-panel--sm {
  --drawer-width: 20rem;
}

.drawer-panel--md {
  --drawer-width: 28rem;
}

.drawer-panel--lg {
  --drawer-width: 38rem;
}

.drawer-panel__header,
.drawer-panel__body,
.drawer-panel__footer {
  padding: var(--ds-space-6);
}

.drawer-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--ds-space-4);
  border-bottom: 1px solid var(--ds-color-border);
}

.drawer-panel__title {
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1;
}

.drawer-panel__description {
  margin: var(--ds-space-2) 0 0;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-label-size);
  line-height: 1.5;
}

.drawer-panel__body {
  flex: 1;
  overflow: auto;
  line-height: var(--ds-type-body-line-height);
}

.drawer-panel__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ds-space-3);
  border-top: 1px solid var(--ds-color-border);
}

.drawer-left-enter-active,
.drawer-left-leave-active,
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: opacity var(--ds-motion-base) var(--ds-ease-standard);
}

.drawer-left-enter-active .drawer-panel,
.drawer-left-leave-active .drawer-panel,
.drawer-right-enter-active .drawer-panel,
.drawer-right-leave-active .drawer-panel {
  transition: transform var(--ds-motion-slow) var(--ds-ease-emphasized);
}

.drawer-left-enter-from,
.drawer-left-leave-to,
.drawer-right-enter-from,
.drawer-right-leave-to {
  opacity: 0;
}

.drawer-left-enter-from .drawer-panel,
.drawer-left-leave-to .drawer-panel {
  transform: translateX(-100%);
}

.drawer-right-enter-from .drawer-panel,
.drawer-right-leave-to .drawer-panel {
  transform: translateX(100%);
}

@media (min-width: 48rem) {
  .drawer-panel__header,
  .drawer-panel__body,
  .drawer-panel__footer {
    padding: var(--ds-space-8);
  }
}
</style>
