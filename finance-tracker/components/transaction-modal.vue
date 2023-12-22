<template>
    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          Add Transaction
        </template>

        <UForm :state="state" :schema="schema" @submit.prevent="save">
          <UFormGroup label="Transaction Type" :required="true" name="type" class="mb-4">
            <USelect placeholder="Select a Transaction Type" :options="transactionType" v-model="state.type"/>
          </UFormGroup>        
        
          <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
            <UInput type="number" placeholder="Amount" v-model.number="state.amount" />
          </UFormGroup>
        
          <UFormGroup label="Transaction date" :required="true" name="created_at" class="mb-4">
            <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="state.created_at" />
          </UFormGroup>

          <UFormGroup label="Description" hint="Optional" name="description" class="mb-4">
            <UInput placeholder="Description" v-model="state.description" />
          </UFormGroup>

          <UFormGroup label="Category" :required="true" name="category" class="mb-4" v-if="state.type === 'Expense'">
            <USelect placeholder="Select a Category" :options="transactionCategories" v-model="state.category" />
          </UFormGroup>

          <UButton type="submit" color="black" variant="solid" label="Save"/>          
        </UForm>
      </UCard>
    </UModal> 
</template>

<script setup>
import { transactionCategories, transactionType } from '~/constants'
import { z } from 'zod'

const props = defineProps({
  modelValue: Boolean
})

const incomeSchema = z.object({
  type: z.literal('Income')
})

// this is not required, rather overkill
// the drop-downs are populated with only valid values
const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(transactionCategories)
})

const investmentSchema = z.object({
  type: z.literal('Investment')
})

const savingSchema = z.object({
  type: z.literal('Saving')
})

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('Amount must be more than 0')
})

// this is not required, rather overkill
// the drop-downs are populated with only valid values
const schema = z.intersection(
  z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
  defaultSchema
)


const save = async() => {
  if (form.value.errors.length) return
  
  // store the data
}

const initialState = {
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
}

const state = ref({
  ...initialState
})

const resetForm = () => {
  Object.assign(state.value, initialState)
}

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  } 
})
</script>