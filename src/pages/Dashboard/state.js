import { useMemo } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import { useQueries } from '@tanstack/react-query'
import { getAllInsights } from '../../services/aiInsightService.js'
import { getDashboardData } from '../../services/dashboardService.js'

const iconMap = {
  wallet: AccountBalanceWalletRoundedIcon,
  savings: SavingsRoundedIcon,
  trendingDown: TrendingDownRoundedIcon,
  autoGraph: AutoGraphRoundedIcon,
}

export function useDashboardState() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['dashboard'],
        queryFn: getDashboardData,
      },
      {
        queryKey: ['ai-insights'],
        queryFn: getAllInsights,
        retry: false,
      },
    ],
  })

  const dashboardQuery = results[0]
  const insightsQuery = results[1]
  const data = dashboardQuery.data

  const summaryCards = useMemo(
    () =>
      (data?.summaryCards || []).map((card) => ({
        ...card,
        icon: iconMap[card.icon],
      })),
    [data],
  )

  const aiInsights = useMemo(() => {
    const aggregatedInsights = insightsQuery.data?.insights || []

    if (aggregatedInsights.length > 0) {
      return aggregatedInsights.slice(0, 2).map((insight) => ({
        id: insight.cardType,
        title: insight.title,
        description: insight.summary,
        severity: insight.severity,
        source: insight.source || insightsQuery.data?.source || 'mock',
      }))
    }

    if (!data?.aiInsight) {
      return []
    }

    return [
      {
        id: 'dashboard-fallback-insight',
        title: data.aiInsight.subtitle,
        description: data.aiInsight.description,
        severity: data.aiInsight.severity || 'medium',
        source: 'dashboard',
      },
    ]
  }, [data?.aiInsight, insightsQuery.data])

  return {
    greeting: data?.greeting,
    summaryCards,
    trend: data?.trend,
    categoryBreakdown: data?.categoryBreakdown,
    aiInsights,
    insightsGeneratedAt: insightsQuery.data?.generatedAt || null,
    recentTransactions: data?.recentTransactions || [],
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
  }
}
