import { useMemo, useState } from 'react'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { getAIInsightsData } from '../../services/aiInsightsService.js'
import {
  getAllInsights,
  refreshAllInsights,
} from '../../services/aiInsightService.js'

const fallbackInsights = {
  tabs: ['Overview', 'Savings', 'Alerts'],
  activeTab: 'Overview',
  insights: [
    {
      id: 'top-category',
      title: 'Top spending category',
      subtitle: 'Groceries is leading this period',
      impact: 'Groceries currently contributes the highest share of your recorded expenses.',
      tone: 'info',
    },
    {
      id: 'ai-categorized',
      title: 'AI categorization coverage',
      subtitle: 'Track how many expenses were auto-tagged',
      impact: 'Use AI categorization to reduce manual tagging effort for repeated merchants.',
      tone: 'warning',
    },
  ],
}

function mapSummaryInsightToCard(summaryInsight) {
  if (!summaryInsight) {
    return null
  }

  return {
    id: 'spending-summary',
    title: summaryInsight.title || 'Spending Summary',
    subtitle: `Severity: ${summaryInsight.severity || 'info'}`,
    impact: summaryInsight.summary || 'No summary available.',
    tone: summaryInsight.severity === 'high' ? 'warning' : 'info',
    source: 'backend',
  }
}

function mapCategoryTrendInsightToCard(categoryTrendInsight) {
  if (!categoryTrendInsight) {
    return null
  }

  return {
    id: 'category-trend',
    title: categoryTrendInsight.title || 'Category Trend',
    subtitle: `Severity: ${categoryTrendInsight.severity || 'info'}`,
    impact: categoryTrendInsight.summary || 'No category trend available.',
    tone: categoryTrendInsight.severity === 'high' ? 'warning' : 'info',
    source: 'backend',
  }
}

function mapAnomalyInsightToCard(anomalyInsight) {
  if (!anomalyInsight) {
    return null
  }

  return {
    id: 'anomaly-detection',
    title: anomalyInsight.title || 'Anomaly Detection',
    subtitle: `Severity: ${anomalyInsight.severity || 'info'}`,
    impact: anomalyInsight.summary || 'No anomaly detected.',
    tone: anomalyInsight.severity === 'high' ? 'warning' : 'info',
    source: 'backend',
  }
}

function mapSavingsOpportunityInsightToCard(savingsOpportunityInsight) {
  if (!savingsOpportunityInsight) {
    return null
  }

  return {
    id: 'savings-opportunity',
    title: savingsOpportunityInsight.title || 'Savings Opportunity',
    subtitle: `Severity: ${savingsOpportunityInsight.severity || 'info'}`,
    impact: savingsOpportunityInsight.summary || 'No savings opportunity available.',
    tone: savingsOpportunityInsight.severity === 'high' ? 'warning' : 'info',
    source: 'backend',
  }
}

export function useAIInsightsState() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState('Overview')
  const results = useQueries({
    queries: [
      {
        queryKey: ['ai-insights'],
        queryFn: getAllInsights,
        retry: false,
      },
      {
        queryKey: ['ai-insights-placeholders'],
        queryFn: getAIInsightsData,
        retry: false,
        staleTime: Infinity,
      },
    ],
  })

  const aggregatedInsightsQuery = results[0]
  const placeholderInsightsQuery = results[1]

  const aggregatedInsights = aggregatedInsightsQuery.data?.insights || []
  const realInsights = aggregatedInsights.map((insight) => {
    if (insight.cardType === 'summary') {
      return mapSummaryInsightToCard(insight)
    }

    if (insight.cardType === 'category-trend') {
      return mapCategoryTrendInsightToCard(insight)
    }

    if (insight.cardType === 'anomaly-detection') {
      return mapAnomalyInsightToCard(insight)
    }

    if (insight.cardType === 'savings-opportunity') {
      return mapSavingsOpportunityInsightToCard(insight)
    }

    return null
  }).filter(Boolean)

  const placeholderInsights = placeholderInsightsQuery.data?.insights || fallbackInsights.insights
  const insights = [...realInsights, ...placeholderInsights.filter((insight) => !realInsights.some((realInsight) => realInsight.id === insight.id))]

  const refreshMutation = useMutation({
    mutationFn: refreshAllInsights,
    onSuccess: (data) => {
      queryClient.setQueryData(['ai-insights'], data)
    },
  })

  return {
    tabs: aggregatedInsightsQuery.data?.tabs || placeholderInsightsQuery.data?.tabs || fallbackInsights.tabs,
    activeTab,
    setActiveTab,
    insights,
    generatedAt: aggregatedInsightsQuery.data?.generatedAt || null,
    source: aggregatedInsightsQuery.data?.source || 'mock',
    isLoading: aggregatedInsightsQuery.isLoading,
    isError: realInsights.length === 0 && aggregatedInsightsQuery.isError,
    isRefreshing: refreshMutation.isPending,
    refreshInsights: refreshMutation.mutateAsync,
  }
}
