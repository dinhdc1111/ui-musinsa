<script setup lang="ts">
import { Camera, ChevronDown, Smartphone } from '@lucide/vue'
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="site-footer" class="site-footer">
    <div class="site-footer__content">
      <nav class="site-footer__legal-links" aria-label="Company information">
        <RouterLink to="/brands">About MUSINSA</RouterLink>
        <span>Terms &amp; Conditions</span>
        <span>Privacy Policy</span>
      </nav>

      <div class="site-footer__quick-actions">
        <button type="button">FAQ</button>
        <button type="button">NOTICE</button>
      </div>

      <section class="site-footer__apps" aria-labelledby="download-app-title">
        <h2 id="download-app-title">Download the MUSINSA app</h2>
        <div>
          <a href="#site-footer" aria-label="Download on the App Store">
            <Smartphone :size="17" aria-hidden="true" />
            <span><small>Download on the</small>App Store</span>
          </a>
          <a href="#site-footer" aria-label="Get it on Google Play">
            <span class="site-footer__play-icon" aria-hidden="true">▶</span>
            <span><small>GET IT ON</small>Google Play</span>
          </a>
        </div>
      </section>

      <a class="site-footer__social" href="#site-footer" aria-label="MUSINSA on Instagram">
        <Camera :size="15" aria-hidden="true" />
      </a>

      <details class="site-footer__company">
        <summary>
          More about MUSINSA Co., Ltd.
          <ChevronDown :size="15" aria-hidden="true" />
        </summary>
        <p>© {{ currentYear }} MUSINSA Co., Ltd. All rights reserved.</p>
      </details>

      <p class="site-footer__notice">
        MUSINSA Co., Ltd. may not be the direct seller but only an intermediary for some products.
        Product information and transaction conditions are provided by each seller.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid #e5e5e5;
  color: #20242c;
  background: #f7f8f9;
}

.site-footer__content {
  width: min(100%, var(--ds-container-content));
  margin: 0 auto;
  padding: 2.5rem var(--ds-space-page-gutter) 4rem;
}

.site-footer__legal-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.6875rem;
}

.site-footer__legal-links a,
.site-footer__legal-links span {
  color: #6d727c;
  text-decoration: none;
}

.site-footer__quick-actions {
  display: grid;
  max-width: 31rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.site-footer__quick-actions button {
  min-height: 2.5rem;
  border: 1px solid #8c929b;
  border-radius: 0.2rem;
  background: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

.site-footer__apps {
  margin-top: 2rem;
}

.site-footer__apps h2 {
  margin: 0 0 0.75rem;
  font-size: 0.8125rem;
}

.site-footer__apps > div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.site-footer__apps a {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.65rem;
  border: 1px solid #a8adb5;
  border-radius: 0.25rem;
  color: #111;
  background: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 0.8rem;
  text-decoration: none;
}

.site-footer__apps a span {
  display: flex;
  flex-direction: column;
}

.site-footer__apps small {
  font-size: 0.5rem;
  font-weight: 400;
}

.site-footer__play-icon {
  font-size: 1rem;
}

.site-footer__social {
  display: grid;
  width: 2rem;
  height: 2rem;
  margin-top: 2rem;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: #111820;
}

.site-footer__company {
  margin-top: 2rem;
  font-size: 0.6875rem;
}

.site-footer__company summary {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  list-style: none;
}

.site-footer__company p,
.site-footer__notice {
  color: #8a909a;
  font-size: 0.625rem;
  line-height: 1.5;
}

.site-footer__notice {
  max-width: 42rem;
  margin: 1.5rem 0 0;
}

@media (min-width: 64rem) {
  .site-footer {
    background: #fff;
  }

  .site-footer__content {
    display: grid;
    grid-template-columns: minmax(18rem, 1fr) minmax(18rem, 1fr);
    column-gap: 5rem;
    padding-inline: 0.8125rem;
  }

  .site-footer__quick-actions {
    margin-top: 0;
  }

  .site-footer__apps,
  .site-footer__social,
  .site-footer__company,
  .site-footer__notice {
    grid-column: 1 / -1;
  }
}
</style>
