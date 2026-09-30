import { useMemo } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../../services/dashboardService.js'

const iconMap = {
  wallet: AccountBalanceWalletRoundedIcon,
  savings: SavingsRoundedIcon,
  trendingDown: TrendingDownRoundedIcon,
  autoGraph: AutoGraphRoundedIcon,
}

export function useDashboardState() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })

  const summaryCards = useMemo(
    () =>
      (data?.summaryCards || []).map((card) => ({
        ...card,
        icon: iconMap[card.icon],
      })),
    [data],
  )

  return {
    greeting: data?.greeting,
    summaryCards,
    trend: data?.trend,
    categoryBreakdown: data?.categoryBreakdown,
    aiInsight: data?.aiInsight,
    recentTransactions: data?.recentTransactions || [],
    isLoading,
    isError,
  }
}
