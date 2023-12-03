<template>
  <div class="container mx-auto max-w-2xl">
    <header class="flex justify-between items-center mt-5">
      <div class="flex item-center space-x-12">
        <div>
          <NuxtLink to="/" class="text-xl font-semibold p-2">Fouche du Preez</NuxtLink>
        </div>
        <Menu />
      </div>
      <ClientOnly>
        <ColorModeSelector />
      </ClientOnly>
    </header>
    <main class="p-2 mt-10">
      <slot />
    </main>
  </div>
</template>
<script setup>

useHead({
  titleTemplate: '%s - Fouche du Preez',
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>

<style>
  body {
    font-family: 'Roboto', sans-serif;
  }
  body {
    @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300
  }

  a, li {
    @apply hover:bg-gray-300 hover:dark:bg-gray-700
  }
</style>

