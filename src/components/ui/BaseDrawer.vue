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

const sideClasses = {
  left: 'left-0',
  right: 'right-0',
} as const

const sizeClasses = {
  sm: 'max-w-80',
  md: 'max-w-md',
  lg: 'max-w-[38rem]',
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
    <Transition :name="`drawer-${side}`">
      <div
        v-if="modelValue"
        class="bg-overlay fixed inset-0 z-[var(--ds-z-drawer)]"
        @mousedown="handleBackdrop"
      >
        <aside
          ref="panelRef"
          class="drawer-panel bg-surface shadow-overlay absolute inset-y-0 flex w-full flex-col outline-none"
          :class="[sideClasses[side], sizeClasses[size]]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description ? descriptionId : undefined"
          tabindex="-1"
          @keydown="onKeydown"
        >
          <header class="border-border flex items-start justify-between gap-4 border-b p-6 md:p-8">
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
            <BaseIconButton label="Close drawer" size="sm" @click="requestClose">
              <X :size="18" />
            </BaseIconButton>
          </header>
          <div class="leading-body flex-1 overflow-auto p-6 md:p-8"><slot /></div>
          <footer
            v-if="$slots.footer"
            class="border-border flex flex-wrap gap-3 border-t p-6 md:p-8"
          >
            <slot name="footer" />
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Vue transition class contracts need stable selectors across both drawer directions. */
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
</style>
