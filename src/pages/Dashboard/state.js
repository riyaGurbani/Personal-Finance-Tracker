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

function parseCurrency(value) {
  if (typeof value === 'number') {
    return value
  }

  if (!value) {
    return 0
  }

  const normalized = String(value).replace(/[^\d.-]/g, '')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value)
}

function formatCompactCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function normalizeTrend(data) {
  const bars = data?.trend?.bars || []
  const months = data?.trend?.months || ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

  return months.map((month, index) => ({
    month,
    amount: bars[index] || 0,
  }))
}

function normalizeCategoryBreakdown(data, totalExpenses) {
  const items = data?.categoryBreakdown?.items || []
  const fallbackPercentages = [82, 68, 54, 40, 26, 20, 18]

  return items.map((item, index) => {
    const percentage = item.percentage ?? fallbackPercentages[index] ?? Math.max(12, 80 - index * 10)
    const amount = item.amount ?? Number(((totalExpenses * percentage) / 100).toFixed(2))

    return {
      ...item,
      percentage,
      amount,
      formattedAmount: formatCurrency(amount),
    }
  })
}

function normalizeTransactions(transactions = []) {
  return transactions.map((transaction) => ({
    ...transaction,
    amountValue: parseCurrency(transaction.amount),
  }))
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

  const totalExpenses = useMemo(() => parseCurrency(summaryCards[0]?.value), [summaryCards])
  const budgetValue = useMemo(() => parseCurrency(summaryCards.find((card) => /budget/i.test(card.title))?.value), [summaryCards])
  const trendData = useMemo(() => normalizeTrend(data), [data])
  const categoryItems = useMemo(() => normalizeCategoryBreakdown(data, totalExpenses), [data, totalExpenses])
  const recentTransactions = useMemo(() => normalizeTransactions(data?.recentTransactions || []), [data?.recentTransactions])

  const aiInsightFallback = data?.aiInsight

  const aiInsights = useMemo(() => {
    const aggregatedInsights = insightsQuery.data?.insights || []

    if (aggregatedInsights.length > 0) {
      return aggregatedInsights.slice(0, 3).map((insight) => ({
        id: insight.id || insight.cardType || insight.type,
        title: insight.title,
        description: insight.summary,
        severity: insight.severity,
        source: insight.source || insightsQuery.data?.source || 'mock',
        generatedAt: insight.generatedAt || insightsQuery.data?.generatedAt || null,
      }))
    }

    if (!aiInsightFallback) {
      return []
    }

    return [
      {
        id: 'dashboard-fallback-insight',
        title: aiInsightFallback.subtitle || aiInsightFallback.title,
        description: aiInsightFallback.description,
        severity: aiInsightFallback.severity || 'medium',
        source: 'dashboard',
        generatedAt: null,
      },
    ]
  }, [aiInsightFallback, insightsQuery.data])

  const budgetUsedPercentage = useMemo(() => {
    if (!budgetValue) {
      return 0
    }

    return Math.min(100, Math.round((totalExpenses / budgetValue) * 100))
  }, [budgetValue, totalExpenses])

  const topCategory = categoryItems[0] || null
  const potentialSavingsCard = summaryCards.find((card) => /saving/i.test(card.title))

  return {
    greeting: data?.greeting,
    summaryCards,
    trend: {
      label: data?.trend?.label || formatCompactCurrency(totalExpenses),
      data: trendData,
    },
    categoryBreakdown: {
      total: data?.categoryBreakdown?.total || recentTransactions.length,
      items: categoryItems,
    },
    aiInsights,
    insightsGeneratedAt: insightsQuery.data?.generatedAt || null,
    recentTransactions,
    overview: {
      totalExpenses,
      totalExpensesLabel: summaryCards[0]?.value || formatCurrency(totalExpenses),
      budgetValue,
      budgetLabel: summaryCards.find((card) => /budget/i.test(card.title))?.value || formatCurrency(budgetValue),
      budgetUsedPercentage,
      topCategory,
      potentialSavings: potentialSavingsCard?.value || formatCurrency(0),
    },
    isLoading: dashboardQuery.isLoading,
    isError: dashboardQuery.isError,
  }
}
