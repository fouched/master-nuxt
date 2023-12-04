<template>
  <p class="mb-10">Project List</p>
  <section v-if="pending">Loading...</section>
  <section v-else-if="error">Something went wrong, try again...</section>
  <section v-else>
    <ul class="grid grid-cols-1 gap-4">
      <li v-for="repository in repos" :key="repository.id" class="border border-gray-200 rounded-sm p-4 hover:bg-gray-200 font-mono">
        <a :href="repository.html_url" target="_blank">
          <div class="flex items-center justify-between">
            <div class="font-semibold">{{ repository.name }}</div>
            <div>{{ repository.stargazers_count }} ★</div>
          </div>
          <p>{{ repository.description }}</p>
         </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
type Repo = {
  id: number
  name: string
  html_url: string
  description: string
  stargazers_count: number
}
const {pending, error, data} = await useFetch<Repo[], Error>(
    'https://api.github.com/users/fouched/repos')

// computed: changes whenever data changes
// filter: Returns the elements of an array that meet the condition
// specified in a callback function. In this case repos with a description
// the data is also sorted in descending order
const repos = computed(
    () => data.value
        ?.filter((repo: Repo) => repo.description)
        .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
);
</script>
