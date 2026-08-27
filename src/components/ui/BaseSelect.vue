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
  <div class="grid min-w-0 gap-2" :class="{ 'opacity-52': disabled }">
    <label class="text-label leading-label font-bold" :for="selectId">
      {{ label }}
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <div
      class="rounded-control border-border-strong bg-surface focus-within:border-focus focus-within:ring-focus relative border transition-[border-color,box-shadow] focus-within:ring-1"
      :class="{ 'border-danger': error }"
    >
      <select
        :id="selectId"
        class="text-text min-h-11 w-full appearance-none border-0 bg-transparent pr-10 pl-3 outline-0"
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
      <ChevronDown
        class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        :size="16"
        aria-hidden="true"
      />
    </div>
    <p
      v-if="error || hint"
      :id="messageId"
      class="text-caption leading-caption text-muted m-0"
      :class="{ 'text-danger': error }"
    >
      {{ error ?? hint }}
    </p>
  </div>
</template>
