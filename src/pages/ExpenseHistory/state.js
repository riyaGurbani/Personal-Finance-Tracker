import { useQuery } from '@tanstack/react-query'
import { getExpenseHistoryData } from '../../services/expenseHistoryService.js'

export function useExpenseHistoryState() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['expense-history'],
    queryFn: getExpenseHistoryData,
  })

  return {
    filters: data?.filters,
    stats: data?.stats || [],
    transactions: data?.transactions || [],
    isLoading,
    isError,
  }
}
