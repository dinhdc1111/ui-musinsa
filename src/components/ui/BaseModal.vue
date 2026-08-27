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

const sizeClasses = {
  sm: 'max-w-[26rem]',
  md: 'max-w-[36rem]',
  lg: 'max-w-[52rem]',
} as const

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
      <div
        v-if="modelValue"
        class="bg-overlay px-page-gutter fixed inset-0 z-[var(--ds-z-modal)] grid place-items-center"
        @mousedown="handleBackdrop"
      >
        <section
          ref="panelRef"
          class="modal-panel rounded-panel bg-surface shadow-overlay max-h-[min(90vh,48rem)] w-full overflow-auto outline-none"
          :class="sizeClasses[size]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header class="border-border flex items-start justify-between gap-6 border-b p-6 md:p-8">
            <div>
              <h2 :id="titleId" class="font-display m-0 text-[1.75rem] leading-none font-medium">
                {{ title }}
              </h2>
              <p
                v-if="description"
                :id="descriptionId"
                class="text-label text-muted mt-2 leading-6"
              >
                {{ description }}
              </p>
            </div>
            <BaseIconButton label="Close dialog" size="sm" @click="requestClose">
              <X :size="18" />
            </BaseIconButton>
          </header>
          <div class="leading-body p-6 md:p-8"><slot /></div>
          <footer
            v-if="$slots.footer"
            class="border-border flex flex-wrap justify-end gap-3 border-t p-6 md:p-8"
          >
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Vue transition class contracts cannot be expressed on the teleported nodes with utilities. */
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
</style>
