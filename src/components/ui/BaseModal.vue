<script setup lang="ts">
import { X } from '@lucide/vue'
import { computed, ref, useId } from 'vue'

import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import { useOverlayFocus } from '@/composables/useOverlayFocus'

interface Props {
  modelValue: boolean
  title: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: undefined,
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
const titleId = `modal-title-${generatedId}`
const descriptionId = `modal-description-${generatedId}`

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
    <Transition name="modal-fade">
      <div v-if="modelValue" class="modal-backdrop" @mousedown="handleBackdrop">
        <section
          ref="panelRef"
          class="modal-panel"
          :class="`modal-panel--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header class="modal-panel__header">
            <div>
              <h2 :id="titleId" class="modal-panel__title">{{ title }}</h2>
              <p v-if="description" :id="descriptionId" class="modal-panel__description">
                {{ description }}
              </p>
            </div>
            <BaseIconButton label="Close dialog" size="sm" @click="requestClose">
              <X :size="18" />
            </BaseIconButton>
          </header>
          <div class="modal-panel__body"><slot /></div>
          <footer v-if="$slots.footer" class="modal-panel__footer"><slot name="footer" /></footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: var(--ds-z-modal);
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--ds-space-page-gutter);
  background: var(--ds-color-overlay);
}

.modal-panel {
  width: 100%;
  max-height: min(90vh, 48rem);
  overflow: auto;
  border-radius: var(--ds-radius-panel);
  outline: none;
  background: var(--ds-color-surface);
  box-shadow: var(--ds-shadow-overlay);
}

.modal-panel--sm {
  max-width: 26rem;
}

.modal-panel--md {
  max-width: 36rem;
}

.modal-panel--lg {
  max-width: 52rem;
}

.modal-panel__header,
.modal-panel__body,
.modal-panel__footer {
  padding: var(--ds-space-6);
}

.modal-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--ds-space-6);
  border-bottom: 1px solid var(--ds-color-border);
}

.modal-panel__title {
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1;
}

.modal-panel__description {
  margin: var(--ds-space-2) 0 0;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-label-size);
  line-height: 1.5;
}

.modal-panel__body {
  line-height: var(--ds-type-body-line-height);
}

.modal-panel__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--ds-space-3);
  border-top: 1px solid var(--ds-color-border);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--ds-motion-base) var(--ds-ease-standard);
}

.modal-fade-enter-active .modal-panel,
.modal-fade-leave-active .modal-panel {
  transition:
    opacity var(--ds-motion-base) var(--ds-ease-standard),
    transform var(--ds-motion-base) var(--ds-ease-emphasized);
}

.modal-fade-enter-from,
.modal-fade-leave-to,
.modal-fade-enter-from .modal-panel,
.modal-fade-leave-to .modal-panel {
  opacity: 0;
}

.modal-fade-enter-from .modal-panel,
.modal-fade-leave-to .modal-panel {
  transform: translateY(0.75rem);
}

@media (min-width: 48rem) {
  .modal-panel__header,
  .modal-panel__body,
  .modal-panel__footer {
    padding: var(--ds-space-8);
  }
}
</style>
