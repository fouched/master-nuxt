export const useCurrency = (amount) => {

  const currency = computed(() => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(isRef(amount) ? amount.value : amount)

  })

  return {
    currency
  }

}
