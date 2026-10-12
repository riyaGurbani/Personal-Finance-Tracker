import { useQueries } from '@tanstack/react-query'
import { getAIInsightsData } from '../../services/aiInsightsService.js'
import { getCategoryTrendInsight, getSummaryInsight } from '../../services/aiInsightService.js'

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

export function useAIInsightsState() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['ai-insights-placeholders'],
        queryFn: getAIInsightsData,
        retry: false,
        staleTime: Infinity,
      },
      {
        queryKey: ['ai-summary-insight'],
        queryFn: getSummaryInsight,
        retry: false,
      },
      {
        queryKey: ['ai-category-trend-insight'],
        queryFn: getCategoryTrendInsight,
        retry: false,
      },
    ],
  })

  const placeholderInsightsQuery = results[0]
  const summaryInsightQuery = results[1]
  const categoryTrendQuery = results[2]

  const summaryInsightCard = mapSummaryInsightToCard(summaryInsightQuery.data)
  const categoryTrendCard = mapCategoryTrendInsightToCard(categoryTrendQuery.data)
  const placeholderInsights = placeholderInsightsQuery.data?.insights || fallbackInsights.insights
  const realInsights = [summaryInsightCard, categoryTrendCard].filter(Boolean)
  const insights = [...realInsights, ...placeholderInsights.filter((insight) => !realInsights.some((realInsight) => realInsight.id === insight.id))]

  return {
    tabs: placeholderInsightsQuery.data?.tabs || fallbackInsights.tabs,
    activeTab: placeholderInsightsQuery.data?.activeTab || fallbackInsights.activeTab,
    insights,
    isLoading: summaryInsightQuery.isLoading || categoryTrendQuery.isLoading,
    isError: !summaryInsightCard && !categoryTrendCard && summaryInsightQuery.isError && categoryTrendQuery.isError,
  }
}
