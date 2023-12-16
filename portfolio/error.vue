<template>
	<NuxtLayout>
		<section>
			<h1 class="text-4xl mb-4">
				Oops! {{ error.statusCode }}
			</h1>
			<p class="text-xl text-gray-500 dark:text-gray-300">
				{{ error.statusMessage }}
			</p>
		</section>
	</NuxtLayout>
</template>

<script setup>
defineProps({
	error: Object
})
</script>