<script setup lang="ts">
import SiteWordmark from '@/components/navigation/SiteWordmark.vue'

interface Props {
  mode: 'login' | 'register'
  title: string
  description: string
  visualSrc: string
  visualAlt: string
  storyTitle: string
  storyCopy: string
}

defineProps<Props>()
</script>

<template>
  <section class="auth-shell" :aria-labelledby="`${mode}-title`">
    <aside class="auth-shell__visual">
      <img :src="visualSrc" :alt="visualAlt" />
      <div class="auth-shell__visual-shade" aria-hidden="true" />

      <div class="auth-shell__brand">
        <SiteWordmark inverse />
        <span>SEOUL / 2026</span>
      </div>

      <div class="auth-shell__story">
        <p>MEMBERSHIP / {{ mode === 'login' ? '01' : '02' }}</p>
        <h2>{{ storyTitle }}</h2>
        <span>{{ storyCopy }}</span>
      </div>
    </aside>

    <div class="auth-shell__panel">
      <div class="auth-shell__content">
        <header class="auth-shell__heading">
          <p>{{ mode === 'login' ? 'Member access' : 'New membership' }}</p>
          <h1 :id="`${mode}-title`">{{ title }}</h1>
          <span>{{ description }}</span>
        </header>

        <slot />

        <footer class="auth-shell__footer">
          <slot name="footer" />
        </footer>
      </div>

      <p class="auth-shell__edition" aria-hidden="true">M / {{ mode === 'login' ? '01' : '02' }}</p>
    </div>
  </section>
</template>

<style scoped>
.auth-shell {
  --auth-color-canvas: #d7d6d1;
  --auth-color-media-fallback: #343432;
  --auth-color-paper: #f4f1e9;
  --auth-color-rule: #c9c6bd;
  --auth-color-rule-soft: #d7d3c9;
  --auth-color-index: #aaa69c;

  display: grid;
  width: 100%;
  min-height: 100dvh;
  grid-template-columns: minmax(0, 1.35fr) minmax(30rem, 0.85fr);
  background: var(--auth-color-canvas);
}

.auth-shell__visual {
  position: sticky;
  top: 0;
  height: 100dvh;
  min-width: 0;
  overflow: hidden;
  background: var(--auth-color-media-fallback);
}

.auth-shell__visual > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.82) contrast(1.04);
  transform: scale(1.01);
}

.auth-shell__visual-shade {
  position: absolute;
  inset: 0;
  background: rgb(13 13 12 / 34%);
}

.auth-shell__brand,
.auth-shell__story {
  position: absolute;
  z-index: 1;
  color: white;
}

.auth-shell__brand {
  top: clamp(1.5rem, 4vw, 3.5rem);
  right: clamp(1.5rem, 4vw, 3.5rem);
  left: clamp(1.5rem, 4vw, 3.5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.auth-shell__brand > span,
.auth-shell__story > p {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.auth-shell__story {
  right: clamp(1.5rem, 5vw, 5rem);
  bottom: clamp(2rem, 6vw, 5.5rem);
  left: clamp(1.5rem, 5vw, 5rem);
  max-width: 38rem;
}

.auth-shell__story > p {
  margin: 0 0 1.25rem;
}

.auth-shell__story h2 {
  max-width: 8ch;
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: clamp(3.5rem, 7vw, 7rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 0.86;
  text-wrap: balance;
}

.auth-shell__story > span {
  display: block;
  max-width: 28rem;
  margin-top: 1.75rem;
  color: rgb(255 255 255 / 78%);
  font-size: 0.9375rem;
  line-height: 1.55;
  text-wrap: pretty;
}

.auth-shell__panel {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 100dvh;
  align-content: start;
  background: var(--auth-color-paper);
}

.auth-shell__content {
  width: min(100%, 33rem);
  margin-inline: auto;
  padding: clamp(3rem, 7vw, 6.5rem) clamp(1.5rem, 5vw, 4rem) 5rem;
}

.auth-shell__heading {
  margin-bottom: 2.75rem;
}

.auth-shell__heading > p {
  margin: 0 0 1rem;
  color: var(--ds-color-muted);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.auth-shell__heading h1 {
  max-width: 10ch;
  margin: 0;
  font-family: var(--ds-font-display);
  font-size: clamp(3rem, 5.5vw, 5rem);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 0.92;
  text-wrap: balance;
}

.auth-shell__heading > span {
  display: block;
  max-width: 27rem;
  margin-top: 1.25rem;
  color: var(--ds-color-muted);
  font-size: 0.9375rem;
  line-height: 1.55;
  text-wrap: pretty;
}

.auth-shell__footer {
  padding-top: 1.75rem;
  border-top: 1px solid var(--auth-color-rule-soft);
  margin-top: 2.25rem;
  color: var(--ds-color-muted);
  font-size: 0.875rem;
}

.auth-shell__edition {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  margin: 0;
  color: var(--auth-color-index);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  writing-mode: vertical-rl;
}

@media (max-width: 63.999rem) {
  .auth-shell {
    grid-template-columns: minmax(15rem, 0.78fr) minmax(29rem, 1.22fr);
  }

  .auth-shell__story h2 {
    font-size: clamp(3rem, 7vw, 4.5rem);
  }
}

@media (max-width: 47.999rem) {
  .auth-shell {
    display: block;
    background: var(--auth-color-paper);
  }

  .auth-shell__visual {
    position: relative;
    height: 14rem;
  }

  .auth-shell__visual > img {
    object-position: center 32%;
  }

  .auth-shell__brand {
    top: 1.25rem;
    right: 1rem;
    left: 1rem;
  }

  .auth-shell__story {
    right: 1rem;
    bottom: 1.25rem;
    left: 1rem;
  }

  .auth-shell__story > p,
  .auth-shell__story > span {
    display: none;
  }

  .auth-shell__story h2 {
    max-width: 10ch;
    font-size: clamp(2.5rem, 12vw, 4rem);
  }

  .auth-shell__panel {
    min-height: auto;
  }

  .auth-shell__content {
    padding: 3rem 1rem 4rem;
  }

  .auth-shell__heading {
    margin-bottom: 2.25rem;
  }

  .auth-shell__heading h1 {
    font-size: clamp(2.75rem, 15vw, 4rem);
  }

  .auth-shell__edition {
    display: none;
  }
}
</style>
