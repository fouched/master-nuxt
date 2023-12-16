<template>
	<article
		class="prose dark:prose-invert max-w-none
    prose-pre:bg-white dark:prose-pre:bg-gray-800 
    dark:prose-pre:text-gray-300 prose-pre:text-gray-700">
		<ContentDoc>
			<template #not-found>
				<h1>Document not found</h1>
				<p>This blog post could not be found</p>
			</template>
			<template v-slot="{ doc }">
				<div class="grid grid-cols-6 gap-16">
					<div :class="{'col-span-6 md:col-span-4': doc.toc, 'col-span-6': !doc.toc}">
						<ContentRenderer :value="doc" />
					</div>
					<div class="hidden md:block md:col-span-2 not-prose" v-if="doc.toc">
						<aside class="sticky top-8">
							<div class="font-semibold mb-2">
								Table of Contents
							</div>
							<nav>
								<TocLinks :links="doc.body.toc.links" :active-id="activeId"/>
							</nav>
						</aside>
					</div>
				</div>
			</template>
		</ContentDoc>
	</article>
</template>

<script setup>
const activeId = ref(null)

// use onMounted to ensure all elements available in the DOM
onMounted(() => {
	const callback = (entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				// set the id of the element being observed
				activeId.value = entry.target.id
				break
			}
		}
	}

	const observer = new IntersectionObserver(callback, {
		// define options to enable / disable callback
		root: null, // whole document
		threshold: 0.5 // how much should be visible
	})

	// define which elements should be observed
	const elements = document.querySelectorAll('h2, h3')
	for (const element of elements) {
		observer.observe(element)
	}

	// clean up
	onBeforeUnmount(() => {
		for (const element of elements) {
			observer.unobserve(element)
		}
	})	
	
})


</script>
