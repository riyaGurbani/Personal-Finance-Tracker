import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { Alert, Box, Button, Grid, Skeleton, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import AIInsightsPanel from '../../components/common/AIInsightsPanel.jsx'
import BudgetHealthCard from '../../components/common/BudgetHealthCard.jsx'
import CategoryBreakdownCard from '../../components/common/CategoryBreakdownCard.jsx'
import DashboardHeroCard from '../../components/common/DashboardHeroCard.jsx'
import RecentTransactionsCard from '../../components/common/RecentTransactionsCard.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import SpendingTrendCard from '../../components/common/SpendingTrendCard.jsx'
import SummaryMetricCard from '../../components/common/SummaryMetricCard.jsx'
import { useDashboardState } from './state.js'

function DashboardLoadingState() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={240} />
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item) => (
          <Grid key={item} size={{ xs: 12, sm: 6, xl: 3 }}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Skeleton variant="rounded" height={360} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Skeleton variant="rounded" height={360} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Skeleton variant="rounded" height={360} />
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Skeleton variant="rounded" height={360} />
        </Grid>
      </Grid>
    </Stack>
  )
}

function DashboardErrorState() {
  return (
    <SectionCard title="Dashboard unavailable" subtitle="Unable to load dashboard data right now.">
      <Stack spacing={2} alignItems="flex-start">
        <Alert severity="error" icon={<ErrorOutlineRoundedIcon fontSize="inherit" />}>
          We could not load your dashboard. Please try again in a moment.
        </Alert>
        <Button startIcon={<RefreshRoundedIcon />} variant="contained" component={RouterLink} to="/dashboard">
          Retry
        </Button>
      </Stack>
    </SectionCard>
  )
}

function DashboardPage() {
  const {
    greeting,
    summaryCards,
    trend,
    categoryBreakdown,
    aiInsights,
    insightsGeneratedAt,
    recentTransactions,
    overview,
    isLoading,
    isError,
  } = useDashboardState()

  const formattedGeneratedAt = insightsGeneratedAt
    ? new Date(insightsGeneratedAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  if (isLoading) {
    return <DashboardLoadingState />
  }

  if (isError) {
    return <DashboardErrorState />
  }

  return (
    <Stack spacing={3}>
      <DashboardHeroCard
        greeting={greeting}
        topCategory={overview.topCategory}
        potentialSavings={overview.potentialSavings}
        onAddExpense={() => {
          window.location.href = '/expenses-add'
        }}
        onAskAi={() => {
          window.location.href = '/ai-assistant'
        }}
      />

      <Grid container spacing={3}>
        {summaryCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, xl: 3 }}>
            <SummaryMetricCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <BudgetHealthCard
            budgetLabel={overview.budgetLabel}
            budgetUsedPercentage={overview.budgetUsedPercentage}
            categoryBreakdown={categoryBreakdown.items}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 7 }}>
          <RecentTransactionsCard transactions={recentTransactions} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SpendingTrendCard data={trend.data} totalLabel={overview.totalExpensesLabel} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <CategoryBreakdownCard items={categoryBreakdown.items} totalLabel={overview.totalExpensesLabel} />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DashboardPage
