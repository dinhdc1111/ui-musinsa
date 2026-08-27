<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="site-footer" class="border-border-soft bg-surface text-text border-t">
    <div class="max-w-content sm:px-page-gutter mx-auto w-full px-4 pt-8 pb-7 lg:px-3.5">
      <nav
        class="text-muted flex flex-wrap items-center gap-x-12 gap-y-3 text-xs"
        aria-label="Company information"
      >
        <RouterLink class="hover:text-text no-underline" to="/brands">About MUSINSA</RouterLink>
        <a class="hover:text-text no-underline" href="#site-footer">Terms &amp; Conditions</a>
        <a class="hover:text-text font-bold no-underline" href="#site-footer">Privacy Policy</a>
      </nav>

      <div class="mt-7 grid w-full max-w-[30.25rem] grid-cols-2 gap-2">
        <button
          class="border-border-strong bg-surface hover:bg-surface-muted min-h-10 rounded-[0.2rem] border text-sm font-bold transition-colors"
          type="button"
        >
          FAQ
        </button>
        <button
          class="border-border-strong bg-surface hover:bg-surface-muted min-h-10 rounded-[0.2rem] border text-sm font-bold transition-colors"
          type="button"
        >
          NOTICE
        </button>
      </div>

      <section class="mt-12" aria-labelledby="download-app-title">
        <h2 id="download-app-title" class="mb-3 text-lg leading-6 font-bold">
          Download the MUSINSA app
        </h2>
        <div class="flex flex-wrap gap-2">
          <a
            class="border-border-strong bg-surface text-text inline-flex min-h-10 min-w-[8.75rem] items-center gap-2 rounded-sm border px-2.5 py-1 no-underline"
            href="#site-footer"
            aria-label="Download on the App Store"
          >
            <svg class="size-6 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M17.05 12.54c.02-2.05 1.68-3.04 1.76-3.09a3.77 3.77 0 0 0-2.97-1.61c-1.25-.13-2.47.75-3.1.75-.65 0-1.62-.74-2.67-.72a3.93 3.93 0 0 0-3.31 2.02c-1.44 2.49-.37 6.15 1.01 8.16.69.98 1.5 2.08 2.55 2.04 1.03-.04 1.42-.66 2.67-.66 1.24 0 1.6.66 2.68.63 1.11-.02 1.81-.99 2.48-1.98a8.11 8.11 0 0 0 1.14-2.32 3.56 3.56 0 0 1-2.24-3.22ZM15.02 6.52a3.64 3.64 0 0 0 .83-2.61 3.7 3.7 0 0 0-2.4 1.24 3.5 3.5 0 0 0-.85 2.51 3.06 3.06 0 0 0 2.42-1.14Z"
              />
            </svg>
            <span class="flex flex-col leading-none">
              <small class="text-[0.5rem] font-normal">Download on the</small>
              <strong class="text-base leading-4 font-semibold">App Store</strong>
            </span>
          </a>
          <a
            class="border-border-strong bg-surface text-text inline-flex min-h-10 min-w-[8.75rem] items-center gap-2 rounded-sm border px-2.5 py-1 no-underline"
            href="#site-footer"
            aria-label="Get it on Google Play"
          >
            <svg class="size-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path class="fill-green-500" d="M3.5 2.7 14 12 3.5 21.3Z" />
              <path
                class="fill-yellow-400"
                d="m14 12 3.2-2.8 3.7 2.1c1 .55 1 1.35 0 1.9l-3.7 2.1-3.2-2.8Z"
              />
              <path class="fill-blue-500" d="m3.5 2.7 13.7 6.5L14 12Z" />
              <path class="fill-red-500" d="M3.5 21.3 14 12l3.2 3.3Z" />
            </svg>
            <span class="flex flex-col leading-none">
              <small class="text-[0.5rem] font-normal">GET IT ON</small>
              <strong class="text-base leading-4 font-semibold">Google Play</strong>
            </span>
          </a>
        </div>
      </section>

      <a
        class="bg-accent mt-12 grid size-8 place-items-center rounded-full text-white transition-opacity hover:opacity-80"
        href="#site-footer"
        aria-label="MUSINSA on Instagram"
      >
        <svg class="size-4 fill-none stroke-current" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke-width="2" />
          <circle cx="12" cy="12" r="4" stroke-width="2" />
          <circle class="fill-current stroke-none" cx="17.5" cy="6.5" r="1" />
        </svg>
      </a>

      <details class="group mt-7 text-xs">
        <summary
          class="inline-flex cursor-pointer list-none items-center gap-1.5 [&::-webkit-details-marker]:hidden"
        >
          Learn more about MUSINSA Co.,Ltd.
          <ChevronDown
            class="transition-transform group-open:rotate-180"
            :size="15"
            aria-hidden="true"
          />
        </summary>
        <p class="text-muted mt-2 text-[0.625rem] leading-4">
          © {{ currentYear }} MUSINSA Co., Ltd. All rights reserved.
        </p>
      </details>

      <p class="text-muted/60 mt-7 max-w-full text-[0.625rem] leading-4">
        MUSINSA Co.,Ltd may not be the direct seller but only an intermediary for some products. In
        this case, MUSINSA has limited liability for products, information, and transactions. Please
        check the product details page of each product.
      </p>
    </div>
  </footer>
</template>
