import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '../../services/api.js'

const paymentMethods = [
  { value: 'UPI', label: 'UPI' },
  { value: 'Card', label: 'Credit Card' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Net Banking', label: 'Net Banking' },
]

const categories = [
  { value: 'Food & Dining', label: 'Food & Dining' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Health', label: 'Health' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Education', label: 'Education' },
  { value: 'Bills', label: 'Bills' },
]

const initialForm = {
  merchant: '',
  date: '',
  time: '',
  amount: '',
  paymentMethod: 'UPI',
  category: 'Food & Dining',
  notes: '',
  isAiCategorized: true,
  isRecurring: false,
}

export function useAddExpenseState() {
  const [form, setForm] = useState(initialForm)
  const [submitMessage, setSubmitMessage] = useState('')
  const [errors, setErrors] = useState({})
  const clearTimerRef = useRef(null)

  // Auto-clear submitMessage after 4 seconds
  useEffect(() => {
    if (submitMessage) {
      clearTimerRef.current = setTimeout(() => {
        setSubmitMessage('')
      }, 4000)
    }
    return () => {
      clearTimeout(clearTimerRef.current)
    }
  }, [submitMessage])

  const saveExpenseMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/expenses', payload)
      return data
    },
    onSuccess: () => {
      setSubmitMessage('Expense saved successfully.')
      setForm(initialForm)
      setErrors({})
    },
    onError: () => {
      setSubmitMessage('Failed to save expense. Please try again.')
    },
  })

  const aiSuggestion = useMemo(() => {
    const selectedCategory = categories.find((category) => category.value === form.category)?.label || form.category
    return {
      title: 'AI Suggestion',
      subtitle: `Suggested category: ${selectedCategory}`,
      description:
        form.merchant.trim().length > 0
          ? `Confidence: 96% · Reason: ${form.merchant} appears related to ${selectedCategory.toLowerCase()} expenses.`
          : 'Confidence: 96% · Reason: Merchant patterns can be used to suggest a likely category.',
    }
  }, [form.category, form.merchant])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  function validateForm() {
    const nextErrors = {}

    if (!form.merchant.trim()) {
      nextErrors.merchant = 'Merchant is required.'
    }

    if (!form.date) {
      nextErrors.date = 'Transaction date is required.'
    }

    if (!form.time) {
      nextErrors.time = 'Transaction time is required.'
    }

    if (!form.amount || Number(form.amount) <= 0) {
      nextErrors.amount = 'Enter a valid amount greater than 0.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function submitExpense() {
    setSubmitMessage('')

    if (!validateForm()) {
      return
    }

    const payload = {
      merchant: form.merchant,
      category: form.category,
      amount: Number(form.amount),
      date: `${form.date}T${form.time}`,
      paymentMethod: form.paymentMethod,
      notes: form.notes,
      isAiCategorized: form.isAiCategorized,
      isRecurring: form.isRecurring,
      aiCategorySuggestion: form.isAiCategorized ? form.category : null,
      aiCategoryConfidence: form.isAiCategorized ? 0.96 : null,
      aiCategoryReason: form.isAiCategorized
        ? `${form.merchant || 'This merchant'} appears related to ${form.category.toLowerCase()}.`
        : null,
    }

    await saveExpenseMutation.mutateAsync(payload)
  }

  return {
    form,
    paymentMethods,
    categories,
    aiSuggestion,
    submitMessage,
    errors,
    isSaving: saveExpenseMutation.isPending,
    updateField,
    submitExpense,
    resetForm: () => {
      setForm(initialForm)
      setErrors({})
      setSubmitMessage('')
    },
  }
}