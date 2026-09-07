<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'

interface Props {
  modelValue: string
  label: string
  variant?: 'default' | 'editorial'
  id?: string
  name?: string
  type?: InputType
  placeholder?: string
  autocomplete?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  name: undefined,
  variant: 'default',
  type: 'text',
  placeholder: undefined,
  autocomplete: undefined,
  hint: undefined,
  error: undefined,
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? `input-${generatedId}`)
const messageId = computed(() => `${inputId.value}-message`)

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="grid min-w-0 gap-2" :class="{ 'opacity-52': disabled }">
    <label class="text-text text-[0.8125rem] leading-5 font-bold" :for="inputId">
      {{ label }}
      <span v-if="required" class="text-danger" aria-hidden="true">*</span>
    </label>
    <div
      class="flex min-h-12 items-center transition-[border-color,box-shadow,background-color] duration-150"
      :class="[
        variant === 'editorial'
          ? 'border-border-strong focus-within:border-text border-0 border-b bg-transparent focus-within:shadow-[0_1px_0_0_var(--ds-color-text)]'
          : 'border-border-strong bg-surface focus-within:border-focus focus-within:ring-focus rounded-md border focus-within:ring-1',
        error && 'border-danger bg-danger-muted/20',
      ]"
    >
      <span
        v-if="$slots.leading"
        class="text-muted grid flex-none place-items-center px-3"
        aria-hidden="true"
      >
        <slot name="leading" />
      </span>
      <input
        v-bind="$attrs"
        :id="inputId"
        class="text-text placeholder:text-muted min-h-[2.875rem] w-full min-w-0 border-0 bg-transparent px-3 text-[0.9375rem] outline-0 disabled:cursor-not-allowed"
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :required="required"
        :disabled="disabled"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="hint || error ? messageId : undefined"
        @input="updateValue"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
      <span v-if="$slots.trailing" class="text-muted grid flex-none place-items-center px-3">
        <slot name="trailing" />
      </span>
    </div>
    <p
      v-if="error || hint"
      :id="messageId"
      class="text-muted m-0 text-[0.8125rem] leading-[1.45]"
      :class="{ 'text-danger': error }"
      :role="error ? 'alert' : undefined"
    >
      {{ error ?? hint }}
    </p>
  </div>
</template>
