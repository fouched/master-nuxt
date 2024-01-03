export const useAvatarUrl = () => {
	// get current user metadata
	// get public url of image
	// watch user for any changes

	const supabase = useSupabaseClient()
	const user = useSupabaseUser()

	const getPublicUrl = () => {

		if (!user.value?.user_metadata?.avatar_url) return null

		const { data } = supabase
			.storage
			.from('avatars')
			.getPublicUrl(user.value.user_metadata.avatar_url)

		return data.publicUrl
	}

	const url = ref(getPublicUrl())

	watch(user, () => url.value = getPublicUrl(), { immediate: true })

	return {url}
}

