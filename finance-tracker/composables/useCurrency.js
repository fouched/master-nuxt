export const useCurrency = (amount) => {
	const currency = computed(() => {
    // use international formatting to avoid regional differences in the client browser
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'ZAR'
		}).format(isRef(amount) ? amount.value : amount)
	})

	return {
		currency,
	}
}
