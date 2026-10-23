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

const initialAiCategory = {
  category: 'Food & Dining',
  confidence: null,
  reason: '',
  source: 'mock',
}

export function useAddExpenseState() {
  const [form, setForm] = useState(initialForm)
  const [aiCategoryResult, setAiCategoryResult] = useState(initialAiCategory)
  const [submitMessage, setSubmitMessage] = useState('')
  const [errors, setErrors] = useState({})
  const clearTimerRef = useRef(null)
  const lastCategorizationKeyRef = useRef('')

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

  const categorizeExpenseMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/ai/categorize-expense', payload)
      return data
    },
    onSuccess: (data) => {
      setAiCategoryResult({
        category: data.category,
        confidence: data.confidence,
        reason: data.reason,
        source: data.source,
      })
      setForm((current) => ({
        ...current,
        category: data.category,
      }))
    },
  })

  useEffect(() => {
    async function runCategorization() {
      if (!form.isAiCategorized) {
        lastCategorizationKeyRef.current = ''
        return
      }

      if (!form.merchant.trim() || !form.amount || Number(form.amount) <= 0) {
        lastCategorizationKeyRef.current = ''
        return
      }

      const requestKey = JSON.stringify({
        merchant: form.merchant.trim(),
        amount: Number(form.amount),
        notes: form.notes.trim(),
        paymentMethod: form.paymentMethod,
      })

      if (lastCategorizationKeyRef.current === requestKey || categorizeExpenseMutation.isPending) {
        return
      }

      lastCategorizationKeyRef.current = requestKey

      try {
        await categorizeExpenseMutation.mutateAsync({
          merchant: form.merchant,
          amount: Number(form.amount),
          currency: 'INR',
          notes: form.notes,
          paymentMethod: form.paymentMethod,
        })
      } catch {
        lastCategorizationKeyRef.current = ''
        setAiCategoryResult(initialAiCategory)
      }
    }

    const timeoutId = setTimeout(() => {
      runCategorization()
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [
    categorizeExpenseMutation,
    form.amount,
    form.isAiCategorized,
    form.merchant,
    form.notes,
    form.paymentMethod,
  ])

  const aiSuggestion = useMemo(() => {
    const selectedCategory = categories.find((category) => category.value === form.category)?.label || form.category
    const confidenceText =
      typeof aiCategoryResult.confidence === 'number' ? `${Math.round(aiCategoryResult.confidence * 100)}%` : 'N/A'

    return {
      title: 'AI Suggestion',
      subtitle: `Suggested category: ${selectedCategory}`,
      description:
        form.isAiCategorized
          ? form.merchant.trim().length > 0
            ? `Confidence: ${confidenceText} · Reason: ${aiCategoryResult.reason || 'Waiting for AI categorization.'}`
            : 'Enter merchant and amount to get an AI category suggestion.'
          : 'AI categorization is off. You can choose the category manually.',
    }
  }, [aiCategoryResult.confidence, aiCategoryResult.reason, form.category, form.isAiCategorized, form.merchant])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))

    if (field === 'isAiCategorized' && !value) {
      lastCategorizationKeyRef.current = ''
      setAiCategoryResult(initialAiCategory)
    }
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
      aiCategorySuggestion: form.isAiCategorized ? aiCategoryResult.category || form.category : null,
      aiCategoryConfidence: form.isAiCategorized ? aiCategoryResult.confidence : null,
      aiCategoryReason: form.isAiCategorized
        ? aiCategoryResult.reason || `${form.merchant || 'This merchant'} was categorized by AI.`
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
    isSaving: saveExpenseMutation.isPending || categorizeExpenseMutation.isPending,
    updateField,
    submitExpense,
    resetForm: () => {
      lastCategorizationKeyRef.current = ''
      setForm(initialForm)
      setAiCategoryResult(initialAiCategory)
      setErrors({})
      setSubmitMessage('')
    },
  }
}