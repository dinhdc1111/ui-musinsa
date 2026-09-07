<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue'
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import officeEditImage from '@/assets/images/home/office-edit.jpg'
import AuthFormShell from '@/components/auth/AuthFormShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { ROUTE_NAMES } from '@/constants/routes'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const submitted = ref(false)
const recoveryMessage = ref('')
const touched = reactive({ email: false, password: false })

const emailError = computed(() => {
  if (!touched.email) return undefined
  if (!email.value.trim()) return 'Enter your email address.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Enter a valid email address.'
  return undefined
})

const passwordError = computed(() => {
  if (!touched.password) return undefined
  if (!password.value) return 'Enter your password.'
  if (password.value.length < 8) return 'Password must contain at least 8 characters.'
  return undefined
})

const submit = () => {
  touched.email = true
  touched.password = true
  submitted.value = !emailError.value && !passwordError.value
}

const requestPasswordReset = () => {
  recoveryMessage.value = email.value.trim()
    ? `Password recovery instructions will be sent to ${email.value.trim()}.`
    : 'Enter your email address first, then select Forgot password.'
}

watch([email, password], () => {
  submitted.value = false
})
</script>

<template>
  <AuthFormShell
    mode="login"
    title="Sign in"
    description="Sign in or create an account to get started."
    :visual-src="officeEditImage"
    visual-alt="Models wearing contemporary office looks in a studio campaign"
    story-title="Work looks different now."
    story-copy="A sharper edit for the routines, commutes, and after-hours plans that shape your week."
  >
    <form class="auth-form" novalidate @submit.prevent="submit">
      <BaseInput
        v-model="email"
        label="Email address"
        variant="editorial"
        name="email"
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        :error="emailError"
        required
        @blur="touched.email = true"
      />

      <BaseInput
        v-model="password"
        label="Password"
        variant="editorial"
        name="password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="current-password"
        placeholder="Enter your password"
        :error="passwordError"
        required
        @blur="touched.password = true"
      >
        <template #trailing>
          <button
            class="auth-form__visibility"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
            <Eye v-else :size="18" aria-hidden="true" />
          </button>
        </template>
      </BaseInput>

      <div class="auth-form__options">
        <label class="auth-form__check">
          <input v-model="rememberMe" type="checkbox" name="remember" />
          <span>Stay signed in</span>
        </label>
        <button class="auth-form__recovery" type="button" @click="requestPasswordReset">
          Forgot password?
        </button>
      </div>

      <p v-if="recoveryMessage" class="auth-form__notice" role="status" aria-live="polite">
        {{ recoveryMessage }}
      </p>
      <p v-if="submitted" class="auth-form__success" role="status" aria-live="polite">
        Your sign-in details are ready to submit.
      </p>

      <BaseButton class="!rounded-none" type="submit" size="lg" full-width>Sign in</BaseButton>
    </form>

    <template #footer>
      New to MUSINSA?
      <RouterLink class="auth-form__footer-link" :to="{ name: ROUTE_NAMES.register }">
        Create an account
      </RouterLink>
    </template>
  </AuthFormShell>
</template>

<style scoped>
.auth-form {
  display: grid;
  gap: 1.25rem;
}

.auth-form__visibility {
  display: grid;
  min-width: 2.75rem;
  min-height: 2.75rem;
  place-items: center;
  padding: 0;
  border: 0;
  color: var(--ds-color-muted);
  background: transparent;
  cursor: pointer;
  transition:
    color var(--ds-motion-fast) var(--ds-ease-standard),
    transform var(--ds-motion-fast) var(--ds-ease-standard);
}

.auth-form__visibility:hover {
  color: var(--ds-color-text);
}

.auth-form__visibility:active {
  transform: translateY(1px);
}

.auth-form__options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: var(--ds-type-label-size);
}

.auth-form__check {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.auth-form__check input {
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  accent-color: var(--ds-color-accent);
}

.auth-form__notice,
.auth-form__success {
  margin: 0;
  padding: 0.875rem 1rem;
  border-left: 3px solid var(--ds-color-border-strong);
  border-radius: 0.25rem;
  background: var(--ds-color-surface-muted);
  color: var(--ds-color-muted);
  font-size: var(--ds-type-caption-size);
  line-height: 1.45;
}

.auth-form__success {
  border-left-color: var(--ds-color-success);
  color: var(--ds-color-success);
  background: var(--ds-color-success-muted);
}

.auth-form__recovery {
  padding: 0;
  border: 0;
  color: var(--ds-color-muted);
  background: transparent;
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
  cursor: pointer;
}

.auth-form__recovery:hover {
  color: var(--ds-color-text);
}

.auth-form__footer-link {
  color: var(--ds-color-text);
  font-weight: 700;
  text-underline-offset: 0.2rem;
}

@media (max-width: 29.999rem) {
  .auth-form__options {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
