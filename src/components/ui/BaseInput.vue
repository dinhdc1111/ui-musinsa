<script setup lang="ts">
import { computed, useId } from 'vue'

defineOptions({ inheritAttrs: false })

type InputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'

interface Props {
  modelValue: string
  label: string
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
  <div class="field" :class="{ 'field--disabled': disabled }">
    <label class="field__label" :for="inputId">
      {{ label }}
      <span v-if="required" class="field__required" aria-hidden="true">*</span>
    </label>
    <div class="field__control" :class="{ 'field__control--invalid': error }">
      <span v-if="$slots.leading" class="field__affix" aria-hidden="true">
        <slot name="leading" />
      </span>
      <input
        v-bind="$attrs"
        :id="inputId"
        class="field__input"
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
      <span v-if="$slots.trailing" class="field__affix" aria-hidden="true">
        <slot name="trailing" />
      </span>
    </div>
    <p
      v-if="error || hint"
      :id="messageId"
      class="field__message"
      :class="{ 'field__message--error': error }"
    >
      {{ error ?? hint }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  gap: var(--ds-space-2);
  min-width: 0;
}

.field__label {
  color: var(--ds-color-text);
  font-size: var(--ds-type-label-size);
  font-weight: 700;
  line-height: var(--ds-type-label-line-height);
}

.field__required,
.field__message--error {
  color: var(--ds-color-danger);
}

.field__control {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  border: 1px solid var(--ds-color-border-strong);
  border-radius: var(--ds-radius-control);
  background: var(--ds-color-surface);
  transition:
    border-color var(--ds-motion-fast) var(--ds-ease-standard),
    box-shadow var(--ds-motion-fast) var(--ds-ease-standard);
}

.field__control:focus-within {
  border-color: var(--ds-color-focus);
  box-shadow: 0 0 0 1px var(--ds-color-focus);
}

.field__control--invalid {
  border-color: var(--ds-color-danger);
}

.field__input {
  width: 100%;
  min-width: 0;
  min-height: 2.625rem;
  padding: 0 var(--ds-space-3);
  border: 0;
  outline: 0;
  color: var(--ds-color-text);
  background: transparent;
}

.field__input::placeholder {
  color: var(--ds-color-muted);
}

.field__affix {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  padding: 0 var(--ds-space-3);
  color: var(--ds-color-muted);
}

.field__message {
  margin: 0;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-caption-size);
  line-height: var(--ds-type-caption-line-height);
}

.field--disabled {
  opacity: 0.52;
}
</style>
