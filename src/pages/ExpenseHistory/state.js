import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getExpenseHistoryData } from '../../services/expenseHistoryService.js'

export function useExpenseHistoryState() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    paymentMethod: '',
    minAmount: '',
    maxAmount: '',
    sortBy: 'date',
    order: 'desc',
    page: 1,
    limit: 10,
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['expense-history', filters],
    queryFn: () => getExpenseHistoryData(filters),
  })

  const availableCategories = useMemo(() => {
    const categories = new Set((data?.transactions || []).map((transaction) => transaction.category).filter(Boolean))
    return Array.from(categories)
  }, [data?.transactions])

  const availablePaymentMethods = useMemo(() => {
    const paymentMethods = new Set(
      (data?.transactions || [])
        .map((transaction) => transaction.paymentMethod)
        .filter((paymentMethod) => paymentMethod && paymentMethod !== '—'),
    )
    return Array.from(paymentMethods)
  }, [data?.transactions])

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value,
      page: name === 'page' ? value : 1,
    }))
  }

  function resetFilters() {
    setFilters({
      search: '',
      category: '',
      paymentMethod: '',
      minAmount: '',
      maxAmount: '',
      sortBy: 'date',
      order: 'desc',
      page: 1,
      limit: 10,
    })
  }

  return {
    filters,
    stats: data?.stats || [],
    transactions: data?.transactions || [],
    pagination: data?.pagination,
    availableCategories,
    availablePaymentMethods,
    updateFilter,
    resetFilters,
    isLoading,
    isError,
  }
}
