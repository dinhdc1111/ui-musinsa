<script setup lang="ts">
import { Heart, Search, ShoppingBag } from '@lucide/vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseDivider from '@/components/ui/BaseDivider.vue'
import BaseDrawer from '@/components/ui/BaseDrawer.vue'
import BaseIconButton from '@/components/ui/BaseIconButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseSkeleton from '@/components/ui/BaseSkeleton.vue'
import BaseTabs from '@/components/ui/BaseTabs.vue'
import { ROUTE_NAMES } from '@/constants/routes'
import {
  badgeExamples,
  buttonExamples,
  categoryOptions,
  colorExamples,
  skeletonRows,
  styleGuideTabs,
} from '@/data/style-guide'

const email = ref('')
const invalidEmail = ref('not-an-email')
const selectedCategory = ref('new')
const activeTab = ref('details')
const isModalOpen = ref(false)
const isDrawerOpen = ref(false)
</script>

<template>
  <article class="style-guide">
    <header class="style-guide__hero">
      <RouterLink class="style-guide__back" :to="{ name: ROUTE_NAMES.home }">Storefront</RouterLink>
      <p class="style-guide__eyebrow">Internal UI reference</p>
      <h1 class="style-guide__display">Quiet structure. Strong fashion.</h1>
      <p class="style-guide__lede">
        A restrained editorial system for image-led commerce, designed mobile-first and built from
        semantic tokens.
      </p>
    </header>

    <section class="style-guide__section" aria-labelledby="typography-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">01</p>
        <h2 id="typography-title">Typography</h2>
      </div>
      <div class="type-specimens">
        <p class="type-specimen type-specimen--display">Display / Seoul, remixed.</p>
        <p class="type-specimen type-specimen--heading">Heading / New season edit</p>
        <p class="type-specimen type-specimen--body">
          Body / A neutral grotesk keeps dense product information readable while the display face
          gives campaigns an editorial voice.
        </p>
        <p class="type-specimen type-specimen--label">Label / Select size</p>
        <p class="type-specimen type-specimen--caption">Caption / Updated for this collection</p>
        <p class="type-specimen type-specimen--price">Price / 1.490.000₫</p>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="colors-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">02</p>
        <h2 id="colors-title">Semantic color</h2>
      </div>
      <div class="color-grid">
        <div v-for="color in colorExamples" :key="color.token" class="color-swatch">
          <span class="color-swatch__sample" :style="{ backgroundColor: `var(${color.token})` }" />
          <strong>{{ color.label }}</strong>
          <code>{{ color.token }}</code>
        </div>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="actions-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">03</p>
        <h2 id="actions-title">Actions</h2>
      </div>
      <div class="component-stack">
        <div class="component-row">
          <BaseButton
            v-for="button in buttonExamples"
            :key="button.variant"
            :variant="button.variant"
          >
            {{ button.label }}
          </BaseButton>
        </div>
        <div class="component-row">
          <BaseButton size="sm">Small</BaseButton>
          <BaseButton size="md">Medium</BaseButton>
          <BaseButton size="lg">Large</BaseButton>
          <BaseButton loading>Loading</BaseButton>
          <BaseButton disabled>Disabled</BaseButton>
        </div>
        <div class="component-row">
          <BaseIconButton label="Search"><Search :size="18" /></BaseIconButton>
          <BaseIconButton label="Save to wishlist" variant="secondary">
            <Heart :size="18" />
          </BaseIconButton>
          <BaseIconButton label="Open cart" variant="primary">
            <ShoppingBag :size="18" />
          </BaseIconButton>
          <BaseDivider orientation="vertical" decorative />
          <BaseIconButton label="Disabled action" disabled><Heart :size="18" /></BaseIconButton>
        </div>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="forms-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">04</p>
        <h2 id="forms-title">Form controls</h2>
      </div>
      <div class="form-grid">
        <BaseInput
          v-model="email"
          label="Email address"
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          hint="Used only to demonstrate the input foundation."
        >
          <template #leading><Search :size="16" /></template>
        </BaseInput>
        <BaseInput
          v-model="invalidEmail"
          label="Email with error"
          type="email"
          error="Enter a valid email address."
          required
        />
        <BaseSelect
          v-model="selectedCategory"
          label="Category"
          :options="categoryOptions"
          hint="Native select behavior with styled presentation."
        />
        <BaseInput model-value="Unavailable" label="Disabled field" disabled />
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="status-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">05</p>
        <h2 id="status-title">Status and structure</h2>
      </div>
      <div class="component-stack">
        <div class="component-row">
          <BaseBadge v-for="badge in badgeExamples" :key="badge.variant" :variant="badge.variant">
            {{ badge.label }}
          </BaseBadge>
        </div>
        <BaseDivider />
        <BaseTabs v-model="activeTab" label="Product information" :tabs="styleGuideTabs">
          <template #default="{ activeTab: currentTab }">
            <p class="tab-demo-copy">
              {{ currentTab.label }} content is active. Use Left, Right, Home and End to move
              between available tabs.
            </p>
          </template>
        </BaseTabs>
      </div>
    </section>

    <section class="style-guide__section" aria-labelledby="overlays-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">06</p>
        <h2 id="overlays-title">Overlays</h2>
      </div>
      <div class="component-row">
        <BaseButton @click="isModalOpen = true">Open modal</BaseButton>
        <BaseButton variant="secondary" @click="isDrawerOpen = true">Open drawer</BaseButton>
      </div>

      <BaseModal
        v-model="isModalOpen"
        title="Size guide"
        description="A focused dialog with keyboard containment and focus restoration."
      >
        <p class="overlay-copy">
          Product measurements will live here in Phase 7. Press Escape or use the close action to
          dismiss this demonstration.
        </p>
        <template #footer>
          <BaseButton variant="secondary" @click="isModalOpen = false">Cancel</BaseButton>
          <BaseButton @click="isModalOpen = false">Done</BaseButton>
        </template>
      </BaseModal>

      <BaseDrawer
        v-model="isDrawerOpen"
        title="Filters"
        description="A mobile-ready side panel with the same focus contract as the modal."
      >
        <div class="drawer-demo-content">
          <BaseSelect v-model="selectedCategory" label="Category" :options="categoryOptions" />
          <BaseDivider />
          <p class="overlay-copy">Filter controls will be composed here during Phase 6.</p>
        </div>
        <template #footer>
          <BaseButton full-width @click="isDrawerOpen = false">Show mock results</BaseButton>
        </template>
      </BaseDrawer>
    </section>

    <section class="style-guide__section" aria-labelledby="loading-title">
      <div class="style-guide__section-heading">
        <p class="style-guide__index">07</p>
        <h2 id="loading-title">Loading shapes</h2>
      </div>
      <div class="skeleton-grid" aria-label="Product loading example">
        <div v-for="item in skeletonRows" :key="item" class="skeleton-card">
          <BaseSkeleton height="18rem" />
          <BaseSkeleton shape="text" width="45%" height="0.75rem" />
          <BaseSkeleton shape="text" width="82%" height="0.875rem" />
          <BaseSkeleton shape="text" width="32%" height="0.875rem" />
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped>
.style-guide {
  width: min(100%, var(--ds-container-content));
  margin: 0 auto;
  padding: 0 var(--ds-space-page-gutter) var(--ds-space-section);
}

.style-guide__hero {
  padding: clamp(var(--ds-space-12), 12vw, 9rem) 0 var(--ds-space-section);
}

.style-guide__back,
.style-guide__eyebrow,
.style-guide__index {
  font-size: var(--ds-type-caption-size);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.style-guide__back {
  display: inline-block;
  margin-bottom: var(--ds-space-16);
  text-underline-offset: var(--ds-space-1);
}

.style-guide__eyebrow,
.style-guide__index {
  margin: 0;
  color: var(--ds-color-muted);
}

.style-guide__display {
  max-width: 11ch;
  margin: var(--ds-space-4) 0 0;
  font-family: var(--ds-font-display);
  font-size: var(--ds-type-display-size);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: var(--ds-type-display-line-height);
}

.style-guide__lede {
  max-width: var(--ds-container-reading);
  margin: var(--ds-space-8) 0 0;
  color: var(--ds-color-muted);
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
}

.style-guide__section {
  padding: var(--ds-space-section) 0;
  border-top: 1px solid var(--ds-color-border);
}

.style-guide__section-heading {
  display: grid;
  gap: var(--ds-space-3);
  margin-bottom: var(--ds-space-10);
}

.style-guide__section-heading h2 {
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: var(--ds-type-heading-size);
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: var(--ds-type-heading-line-height);
}

.type-specimens,
.component-stack,
.drawer-demo-content,
.skeleton-card {
  display: grid;
  gap: var(--ds-space-5);
}

.type-specimen {
  margin: 0;
}

.type-specimen--display,
.type-specimen--heading {
  font-family: var(--ds-font-display);
  letter-spacing: -0.035em;
}

.type-specimen--display {
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 0.95;
}

.type-specimen--heading {
  font-size: var(--ds-type-heading-size);
  line-height: var(--ds-type-heading-line-height);
}

.type-specimen--body {
  max-width: var(--ds-container-reading);
  font-size: var(--ds-type-body-size);
  line-height: var(--ds-type-body-line-height);
}

.type-specimen--label {
  font-size: var(--ds-type-label-size);
  font-weight: 700;
}

.type-specimen--caption {
  color: var(--ds-color-muted);
  font-size: var(--ds-type-caption-size);
}

.type-specimen--price {
  color: var(--ds-color-sale);
  font-size: var(--ds-type-price-size);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.color-grid,
.form-grid,
.skeleton-grid {
  display: grid;
  gap: var(--ds-space-grid);
}

.color-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.color-swatch {
  display: grid;
  gap: var(--ds-space-2);
  min-width: 0;
  font-size: var(--ds-type-caption-size);
}

.color-swatch__sample {
  aspect-ratio: 3 / 2;
  border: 1px solid var(--ds-color-border);
}

.color-swatch code {
  overflow: hidden;
  color: var(--ds-color-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.component-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--ds-space-3);
}

.form-grid {
  align-items: start;
}

.tab-demo-copy,
.overlay-copy {
  margin: 0;
  color: var(--ds-color-muted);
  line-height: var(--ds-type-body-line-height);
}

.skeleton-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 48rem) {
  .style-guide__section-heading {
    grid-template-columns: 4rem 1fr;
    align-items: baseline;
  }

  .color-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .form-grid,
  .skeleton-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 64rem) {
  .color-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .skeleton-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
