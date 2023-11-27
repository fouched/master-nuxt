<template>
  <div>
    Hello from the main page
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Main Page',
    description: 'This is the main page',
    ogTitle: 'Main Page',
    ogDescription: 'This is the main page',
    ogImage: '[og:image]',
    ogUrl: '[og:url]',
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary'
  })

  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  })
</script>