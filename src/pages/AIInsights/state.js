import { useQuery } from '@tanstack/react-query'
import { getAIInsightsData } from '../../services/aiInsightsService.js'

export function useAIInsightsState() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: getAIInsightsData,
  })

  return {
    tabs: data?.tabs || [],
    activeTab: data?.activeTab,
    insights: data?.insights || [],
    isLoading,
    isError,
  }
}
