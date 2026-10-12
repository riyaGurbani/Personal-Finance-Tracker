import { useMemo } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import { useQueries } from '@tanstack/react-query'
import { getSummaryInsight } from '../../services/aiInsightService.js'
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
        queryKey: ['ai-summary-insight'],
        queryFn: getSummaryInsight,
        retry: false,
      },
    ],
  })

  const dashboardQuery = results[0]
  const summaryInsightQuery = results[1]
  const data = dashboardQuery.data

  const summaryCards = useMemo(
    () =>
      (data?.summaryCards || []).map((card) => ({
        ...card,
        icon: iconMap[card.icon],
      })),
    [data],
  )

  const aiInsight = useMemo(() => {
    if (summaryInsightQuery.data) {
      return {
        title: 'AI Spending Insight',
        subtitle: summaryInsightQuery.data.title,
        description: summaryInsightQuery.data.summary,
        severity: summaryInsightQuery.data.severity,
      }
    }

    return data?.aiInsight
  }, [data?.aiInsight, summaryInsightQuery.data])

  return {
    greeting: data?.greeting,
    summaryCards,
    trend: data?.trend,
    categoryBreakdown: data?.categoryBreakdown,
    aiInsight,
    recentTransactions: data?.recentTransactions || [],
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
  }
}
