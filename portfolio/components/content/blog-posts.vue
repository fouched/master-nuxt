<template>
	<section class="not-prose">
		<ul>
			<li v-for="post in posts" :key="post._path">
				<NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
			</li>
		</ul>
	</section>
</template>
<script setup>
// to prevent fetch duplication (front & backend) on first load
// wrap query in useAsyncData composable
const { data: posts } = await useAsyncData('blog-list', () =>
	queryContent('/blog')
		.where({ _path: { $ne: '/blog' } })
		.only(['_path', 'title'])
		.find()
)
console.log(posts)
</script>
