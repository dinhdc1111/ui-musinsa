<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue'
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import AuthFormShell from '@/components/auth/AuthFormShell.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import { ROUTE_NAMES } from '@/constants/routes'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)
const submitted = ref(false)
const termsError = ref('')
const touched = reactive({ name: false, email: false, password: false, confirmPassword: false })

const nameError = computed(() => {
  if (!touched.name) return undefined
  return name.value.trim().length >= 2 ? undefined : 'Enter your full name.'
})

const emailError = computed(() => {
  if (!touched.email) return undefined
  if (!email.value.trim()) return 'Enter your email address.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return 'Enter a valid email address.'
  return undefined
})

const passwordError = computed(() => {
  if (!touched.password) return undefined
  if (password.value.length < 8) return 'Use at least 8 characters.'
  if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) {
    return 'Include at least one letter and one number.'
  }
  return undefined
})

const confirmPasswordError = computed(() => {
  if (!touched.confirmPassword) return undefined
  if (!confirmPassword.value) return 'Confirm your password.'
  return confirmPassword.value === password.value ? undefined : 'Passwords do not match.'
})

const submit = () => {
  Object.assign(touched, { name: true, email: true, password: true, confirmPassword: true })
  termsError.value = acceptTerms.value ? '' : 'Accept the Terms of Use to continue.'
  submitted.value =
    !nameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value &&
    !termsError.value
}

watch([name, email, password, confirmPassword, acceptTerms], () => {
  submitted.value = false
})
</script>

<template>
  <AuthFormShell
    eyebrow="Join MUSINSA"
    title="Create account"
    description="Save your favorites and get access to exclusive member offers."
    feature-title="The best of K-fashion, made personal."
    feature-copy="Create your profile and discover edits shaped around your style."
  >
    <form class="auth-form" novalidate @submit.prevent="submit">
      <div class="auth-form__row">
        <BaseInput
          v-model="name"
          label="Full name"
          name="name"
          autocomplete="name"
          placeholder="Your name"
          :error="nameError"
          required
          @blur="touched.name = true"
        />
        <BaseInput
          v-model="email"
          label="Email address"
          name="email"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          :error="emailError"
          required
          @blur="touched.email = true"
        />
      </div>

      <BaseInput
        v-model="password"
        label="Password"
        name="password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="new-password"
        placeholder="At least 8 characters"
        hint="Use 8 or more characters with at least one letter and one number."
        :error="passwordError"
        required
        @blur="touched.password = true"
      >
        <template #trailing>
          <button
            class="auth-form__visibility"
            type="button"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
            <Eye v-else :size="18" aria-hidden="true" />
          </button>
        </template>
      </BaseInput>

      <BaseInput
        v-model="confirmPassword"
        label="Confirm password"
        name="confirm-password"
        :type="showPassword ? 'text' : 'password'"
        autocomplete="new-password"
        placeholder="Enter your password again"
        :error="confirmPasswordError"
        required
        @blur="touched.confirmPassword = true"
      />

      <label class="auth-form__terms">
        <input v-model="acceptTerms" type="checkbox" name="terms" @change="termsError = ''" />
        <span>I agree to the Terms of Use and acknowledge the Privacy Policy.</span>
      </label>
      <p v-if="termsError" class="auth-form__error" role="alert">{{ termsError }}</p>
      <p v-if="submitted" class="auth-form__success" role="status">
        Your details are valid. You can now connect this form to the registration API.
      </p>

      <BaseButton type="submit" size="lg" full-width>Create account</BaseButton>
    </form>

    <template #footer>
      Already have an account?
      <RouterLink class="auth-form__footer-link" :to="{ name: ROUTE_NAMES.login }">
        Sign in
      </RouterLink>
    </template>
  </AuthFormShell>
</template>

<style scoped>
.auth-form {
  display: grid;
  gap: 1.125rem;
}

.auth-form__row {
  display: grid;
  align-items: start;
  gap: 1.125rem;
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
}

.auth-form__visibility:hover {
  color: var(--ds-color-text);
}

.auth-form__terms {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-label-size);
  line-height: 1.4;
  cursor: pointer;
}

.auth-form__terms input {
  width: 1rem;
  height: 1rem;
  flex: none;
  margin: 0.1rem 0 0;
  accent-color: var(--ds-color-accent);
}

.auth-form__error,
.auth-form__success {
  margin: -0.5rem 0 0;
  color: var(--ds-color-danger);
  font-size: var(--ds-type-caption-size);
  line-height: 1.45;
}

.auth-form__success {
  padding: 0.75rem;
  border-radius: var(--ds-radius-control);
  color: var(--ds-color-success);
  background: var(--ds-color-success-muted);
}

.auth-form__footer-link {
  color: var(--ds-color-text);
  font-weight: 700;
  text-underline-offset: 0.2rem;
}

@media (min-width: 40rem) {
  .auth-form__row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
