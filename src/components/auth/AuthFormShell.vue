<script setup lang="ts">
interface Props {
  eyebrow: string
  title: string
  description: string
  featureTitle: string
  featureCopy: string
}

defineProps<Props>()
</script>

<template>
  <section
    class="auth-shell"
    :aria-labelledby="`${eyebrow.toLowerCase().replaceAll(' ', '-')}-title`"
  >
    <aside class="auth-shell__feature" aria-hidden="true">
      <span class="auth-shell__feature-index">M / 01</span>
      <div>
        <p>MEMBERSHIP</p>
        <h2>{{ featureTitle }}</h2>
        <span>{{ featureCopy }}</span>
      </div>
    </aside>

    <div class="auth-shell__content">
      <header class="auth-shell__heading">
        <p>{{ eyebrow }}</p>
        <h1 :id="`${eyebrow.toLowerCase().replaceAll(' ', '-')}-title`">{{ title }}</h1>
        <span>{{ description }}</span>
      </header>

      <slot />

      <footer class="auth-shell__footer">
        <slot name="footer" />
      </footer>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  display: grid;
  width: min(100% - 2rem, 60rem);
  min-height: 38rem;
  margin: 2rem auto 4rem;
  overflow: hidden;
  border: 1px solid var(--ds-color-border);
  border-radius: var(--ds-radius-panel);
  background: var(--ds-color-surface);
  box-shadow: var(--ds-shadow-soft);
}

.auth-shell__feature {
  position: relative;
  display: none;
  min-width: 0;
  padding: 2.25rem;
  overflow: hidden;
  color: var(--ds-color-accent-contrast);
  background:
    linear-gradient(145deg, transparent 0 56%, rgb(255 255 255 / 7%) 56% 57%, transparent 57%),
    var(--ds-color-accent);
}

.auth-shell__feature::after {
  position: absolute;
  right: -8rem;
  bottom: -10rem;
  width: 24rem;
  height: 24rem;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  box-shadow:
    0 0 0 3.5rem rgb(255 255 255 / 3%),
    0 0 0 7rem rgb(255 255 255 / 3%);
  content: '';
}

.auth-shell__feature-index {
  align-self: start;
  font-size: var(--ds-type-caption-size);
  font-weight: 700;
  letter-spacing: 0.14em;
}

.auth-shell__feature > div {
  position: relative;
  z-index: 1;
  align-self: end;
  max-width: 20rem;
}

.auth-shell__feature p,
.auth-shell__heading p {
  margin: 0 0 1rem;
  font-size: var(--ds-type-caption-size);
  font-weight: 700;
  letter-spacing: 0.14em;
}

.auth-shell__feature h2 {
  margin: 0 0 1rem;
  font-family: var(--ds-font-display);
  font-size: clamp(2.25rem, 4vw, 3.75rem);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 0.95;
}

.auth-shell__feature div > span {
  color: rgb(255 255 255 / 68%);
  line-height: 1.5;
}

.auth-shell__content {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2rem, 6vw, 4.5rem);
}

.auth-shell__heading {
  margin-bottom: 2rem;
}

.auth-shell__heading p {
  color: var(--ds-color-muted);
}

.auth-shell__heading h1 {
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 1;
}

.auth-shell__heading > span {
  display: block;
  margin-top: 1rem;
  color: var(--ds-color-muted);
  line-height: 1.5;
}

.auth-shell__footer {
  padding-top: 1.5rem;
  border-top: 1px solid var(--ds-color-border-soft);
  margin-top: 2rem;
  color: var(--ds-color-muted);
  font-size: var(--ds-type-label-size);
  text-align: center;
}

@media (min-width: 48rem) {
  .auth-shell {
    grid-template-columns: minmax(17rem, 0.85fr) minmax(25rem, 1.15fr);
  }

  .auth-shell__feature {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

@media (max-width: 39.999rem) {
  .auth-shell {
    width: 100%;
    min-height: auto;
    margin: 0;
    border-width: 1px 0 0;
    box-shadow: none;
  }

  .auth-shell__content {
    padding: 2.25rem 1rem 3rem;
  }
}
</style>
