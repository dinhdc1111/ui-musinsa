import { nextTick, onBeforeUnmount, type Ref, watch } from 'vue'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

interface OverlayFocusOptions {
  isOpen: Ref<boolean>
  panelRef: Ref<HTMLElement | null>
  closeOnEscape: () => boolean
  requestClose: () => void
}

export function useOverlayFocus(options: OverlayFocusOptions) {
  let previouslyFocused: HTMLElement | null = null
  let previousBodyOverflow = ''

  const getFocusableElements = () => {
    if (!options.panelRef.value) return []

    return Array.from(
      options.panelRef.value.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => !element.hasAttribute('aria-hidden'))
  }

  const restoreDocument = () => {
    document.body.style.overflow = previousBodyOverflow
    previouslyFocused?.focus()
    previouslyFocused = null
  }

  watch(
    options.isOpen,
    async (isOpen) => {
      if (!isOpen) {
        restoreDocument()
        return
      }

      previouslyFocused =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      await nextTick()
      const [firstFocusable] = getFocusableElements()
      ;(firstFocusable ?? options.panelRef.value)?.focus()
    },
    { immediate: true, flush: 'post' },
  )

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && options.closeOnEscape()) {
      event.preventDefault()
      options.requestClose()
      return
    }

    if (event.key !== 'Tab') return

    const focusableElements = getFocusableElements()
    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (!firstElement || !lastElement) {
      event.preventDefault()
      options.panelRef.value?.focus()
      return
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  onBeforeUnmount(() => {
    if (options.isOpen.value) restoreDocument()
  })

  return { onKeydown }
}
