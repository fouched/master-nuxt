<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">
      Summary
    </h1>
    <div>
      <USelectMenu :options="transactionViewOptions" v-model="selectedView" />
    </div>
  </section>

  <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-16 mb-10">
    <Trend color="green" title="Income" :amount="incomeTotal" :lastAmount="prevIncomeTotal" :loading="pending"/>
    <Trend color="red" title="Expenses" :amount="expenseTotal" :lastAmount="prevExpenseTotal" :loading="pending" />    
    <Trend color="green" title="Savings" :amount="savingTotal" :lastAmount="prevSavingTotal" :loading="pending" />
    <!--
    <Trend color="red" title="Investments" :amount="4000" :lastAmount="4100" :loading="pending" />
    -->
  </section>

  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes, {{ expenseCount }} expenses and {{ savingCount }} savings this period
      </div>
    </div>
    <div>
      <TransactionModal v-model="isOpen" @saved="refresh()"/>
      <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isOpen = true"/>
    </div>
  </section>

  <section v-if="!pending">
    <div v-for="(transactionOnDay, date) in byDate" :key="date" class="mb-10">
        <DailyTransactionSummary :date="date" :transactions="transactionOnDay"/>
        <Transaction v-for="transaction in transactionOnDay" :key="transaction.id" 
          :transaction="transaction" 
          @deleted="refresh()"
          @edited="refresh()"
          />
    </div>    
  </section>

  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i"/>
  </section>
</template>

<script setup>
import { transactionViewOptions } from '~/constants';

const user = useSupabaseUser()


const selectedView = ref(user.value.user_metadata?.transaction_view ?? transactionViewOptions[1])
const isOpen = ref(false)
const {current, previous} = useSelectedTimePeriod(selectedView)

const {pending, refresh, transactions: {
  incomeCount,
  expenseCount,
  savingCount,
  incomeTotal,
  expenseTotal,
  savingTotal,
  grouped: {
    byDate
  }
}} = useFetchTransactions(current)
await refresh()

const {refresh: refreshPrevious, transactions: {
  incomeTotal: prevIncomeTotal,
  expenseTotal: prevExpenseTotal,
  savingTotal: prevSavingTotal,
}} = useFetchTransactions(previous)
await refreshPrevious()

</script>




