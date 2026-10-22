import { useState } from 'react'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import {
  getAiHealth,
  getAllInsights,
  refreshAllInsights,
} from '../../services/aiInsightService.js'
function mapInsightToCard(insight) {
  if (!insight) {
    return null
  }

  return {
    id: insight.id || insight.type || insight.cardType,
    type: insight.type || insight.cardType,
    title: insight.title || 'AI Insight',
    summary: insight.summary || 'No insight summary available.',
    severity: insight.severity || 'low',
    tone: insight.severity === 'high' ? 'warning' : insight.severity === 'medium' ? 'secondary' : 'info',
    source: insight.source || 'mock',
    provider: insight.provider || 'mock',
    fallbackUsed: Boolean(insight.fallbackUsed),
    generatedAt: insight.generatedAt || null,
    metadata: insight.metadata || {},
  }
}

export function useAIInsightsState() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('Overview')
  const results = useQueries({
    queries: [
      {
        queryKey: ['ai-health'],
        queryFn: getAiHealth,
        retry: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['ai-insights'],
        queryFn: getAllInsights,
        retry: false,
      },
    ],
  })

  const healthQuery = results[0]
  const aggregatedInsightsQuery = results[1]

  const aggregatedInsights = aggregatedInsightsQuery.data?.insights || []
  const insights = aggregatedInsights.map(mapInsightToCard).filter(Boolean)

  const refreshMutation = useMutation({
    mutationFn: refreshAllInsights,
    onSuccess: (data) => {
      queryClient.setQueryData(['ai-insights'], data)
    },
  })

  return {
    tabs: aggregatedInsightsQuery.data?.tabs || ['Overview', 'Savings', 'Alerts'],
    activeTab,
    setActiveTab,
    insights,
    generatedAt: aggregatedInsightsQuery.data?.generatedAt || null,
    source: aggregatedInsightsQuery.data?.source || 'mock',
    provider: aggregatedInsightsQuery.data?.provider || healthQuery.data?.provider || 'mock',
    fallbackUsed: Boolean(aggregatedInsightsQuery.data?.fallbackUsed),
    health: healthQuery.data || null,
    isLoading: aggregatedInsightsQuery.isLoading || healthQuery.isLoading,
    isError: aggregatedInsightsQuery.isError,
    healthError: healthQuery.isError,
    isRefreshing: refreshMutation.isPending,
    refreshInsights: refreshMutation.mutateAsync,
  }
}
