<template>
	<UCard>
		<template #header>
			Signing in...
		</template>
		Wait a momemnt while we sign you in...
	</UCard>
</template>

<script setup>
useRedirectIfAuthenticated('/')

</script>