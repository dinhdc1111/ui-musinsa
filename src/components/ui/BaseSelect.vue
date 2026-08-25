<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { computed, useId } from 'vue'

import type { SelectOption } from '@/types/ui'

interface Props {
  modelValue: string
  label: string
  options: readonly SelectOption[]
  id?: string
  name?: string
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  placeholder: undefined,
  hint: undefined,
  error: undefined,
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const generatedId = useId()
const selectId = computed(() => props.id ?? `select-${generatedId}`)
const messageId = computed(() => `${selectId.value}-message`)

const updateValue = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="select-field" :class="{ 'select-field--disabled': disabled }">
    <label class="select-field__label" :for="selectId">
      {{ label }}
      <span v-if="required" class="select-field__required" aria-hidden="true">*</span>
    </label>
    <div class="select-field__control" :class="{ 'select-field__control--invalid': error }">
      <select
        :id="selectId"
        class="select-field__select"
        :name="name"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="hint || error ? messageId : undefined"
        @change="updateValue"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <ChevronDown class="select-field__icon" :size="16" aria-hidden="true" />
    </div>
    <p
      v-if="error || hint"
      :id="messageId"
      class="select-field__message"
      :class="{ 'select-field__message--error': error }"
    >
      {{ error ?? hint }}
    </p>
  </div>
</template>

<style scoped>
.select-field {
  display: grid;
  gap: var(--ds-space-2);
  min-width: 0;
}

.select-field__label {
  font-size: var(--ds-type-label-size);
  font-weight: 700;
  line-height: var(--ds-type-label-line-height);
}

.select-field__required,
.select-field__message--error {
  color: var(--ds-color-danger);
}

.select-field__control {
  position: relative;
  border: 1px solid var(--ds-color-border-strong);
  border-radius: var(--ds-radius-control);
  background: var(--ds-color-surface);
  transition:
    border-color var(--ds-motion-fast) var(--ds-ease-standard),
    box-shadow var(--ds-motion-fast) var(--ds-ease-standard);
}

.select-field__control:focus-within {
  border-color: var(--ds-color-focus);
  box-shadow: 0 0 0 1px var(--ds-color-focus);
}

.select-field__control--invalid {
  border-color: var(--ds-color-danger);
}

.select-field__select {
  width: 100%;
  min-height: 2.75rem;
  padding: 0 2.5rem 0 var(--ds-space-3);
  border: 0;
  outline: 0;
  appearance: none;
  color: var(--ds-color-text);
  background: transparent;
}

.select-field__icon {
  position: absolute;
  top: 50%;
  right: var(--ds-space-3);
  pointer-events: none;
  transform: translateY(-50%);
}

.select-field__message {
  margin: 0;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-caption-size);
  line-height: var(--ds-type-caption-line-height);
}

.select-field--disabled {
  opacity: 0.52;
}
</style>
