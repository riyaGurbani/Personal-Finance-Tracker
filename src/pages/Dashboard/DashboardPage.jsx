import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import { alpha } from '@mui/material/styles'
import { Box, Button, Chip, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import BudgetHealthCard from '../../components/common/BudgetHealthCard.jsx'
import FinancialSnapshotCard from '../../components/common/FinancialSnapshotCard.jsx'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import SummaryMetricCard from '../../components/common/SummaryMetricCard.jsx'
import TopAIInsightCard from '../../components/common/TopAIInsightCard.jsx'
import TransactionsListItem from '../../components/common/TransactionsListItem.jsx'
import { useDashboardState } from './state.js'

const severityColorMap = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

const severityLabelMap = {
  low: 'Low impact',
  medium: 'Needs attention',
  high: 'High priority',
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
    isLoading,
    isError,
  } = useDashboardState()

  const formattedGeneratedAt = insightsGeneratedAt
    ? new Date(insightsGeneratedAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : null

  const topInsight = aiInsights[0]
  const secondaryInsights = aiInsights.slice(1)

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 320 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError) {
    return (
      <SectionCard title="Dashboard unavailable" subtitle="Unable to load dashboard data right now.">
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </SectionCard>
    )
  }

  return (
    <Stack spacing={3}>
      <PageIntro
        eyebrow="Daily overview"
        title={greeting?.title}
        description="Track spending, review AI guidance, and take action from one place."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <FinancialSnapshotCard
            greeting={greeting}
            summaryCards={summaryCards}
            topInsight={topInsight}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <TopAIInsightCard
            insight={topInsight}
            generatedAt={formattedGeneratedAt}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {summaryCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, xl: 3 }}>
            <SummaryMetricCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard
            title="Monthly Expense Trend"
            subtitle="Last 6 months — bar height represents relative spend"
            action={<Chip label={trend?.label || 'Live trend'} color="primary" variant="outlined" />}
            minHeight={320}
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  height: 220,
                  borderRadius: 4,
                  background:
                    'linear-gradient(180deg, rgba(76,111,255,0.12) 0%, rgba(123,97,255,0.04) 100%)',
                  border: '1px dashed rgba(76,111,255,0.28)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                      'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
                    backgroundSize: '100% 44px, 56px 100%',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 24,
                    right: 24,
                    bottom: 36,
                    top: 36,
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 2,
                  }}
                >
                  {(trend?.bars || []).map((height, index) => (
                    <Box key={index} sx={{ flex: 1, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 0,
                          width: 10,
                          height: `${height}%`,
                          transform: 'translateX(-50%)',
                          borderRadius: 999,
                          background: index === (trend.bars.length - 1) ? 'linear-gradient(180deg, #4c6fff 0%, #7b61ff 100%)' : 'rgba(76,111,255,0.22)',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
                <Chip label={trend?.label} color="primary" size="small" sx={{ position: 'absolute', top: 12, right: 12 }} />
              </Box>
              {trend?.months && (
                <Box sx={{ display: 'flex', justifyContent: 'space-around', px: 1, mt: 0.5 }}>
                  {trend.months.map((month) => (
                    <Typography key={month} variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                      {month}
                    </Typography>
                  ))}
                </Box>
              )}
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <BudgetHealthCard summaryCards={summaryCards} categoryBreakdown={categoryBreakdown} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard
            title="Category breakdown"
            subtitle="Top spending categories ranked for faster review"
            minHeight={320}
          >
            <Stack spacing={1.25}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: 'rgba(76,111,255,0.06)',
                  border: '1px solid rgba(76,111,255,0.12)',
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total tracked expenses
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5 }}>
                    {categoryBreakdown?.total || '—'}
                  </Typography>
                </Box>
                <Chip label="Top 5" color="primary" variant="outlined" />
              </Stack>
              {(categoryBreakdown?.items || []).map(({ label, color, percentage }, index) => (
                <Stack
                  key={label}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.78)',
                    border: '1px solid rgba(148,163,184,0.12)',
                  }}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="body2">{label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rank #{index + 1}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="subtitle2">{percentage ?? Math.max(20, 82 - index * 14)}%</Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard
            title="Priority insights"
            subtitle={formattedGeneratedAt ? `Last generated: ${formattedGeneratedAt}` : 'Latest AI-generated signals'}
          >
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                }}
              >
                <InsightsRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  AI highlights surface the most important changes so you can act quickly without scanning every transaction.
                </Typography>
              </Stack>
              {secondaryInsights.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No additional insights available yet.
                </Typography>
              )}
              {secondaryInsights.map((insight) => (
                <Stack
                  key={insight.id}
                  spacing={1.25}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(148,163,184,0.18)',
                    backgroundColor: 'rgba(255,255,255,0.72)',
                  }}
                >
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Chip label={insight.title} size="small" variant="outlined" />
                    <Chip
                      label={severityLabelMap[insight.severity] || insight.severity}
                      color={severityColorMap[insight.severity] || 'default'}
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {insight.description}
                  </Typography>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      Source: {insight.source}
                    </Typography>
                    <NorthEastRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </Stack>
                </Stack>
              ))}
              <Box>
                <Button component={RouterLink} to="/ai-insights" variant="contained" size="small">
                  Open insight center
                </Button>
              </Box>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard
            title="Recent Transactions"
            subtitle="Recent activity and AI-categorized expenses"
            action={<Button component={RouterLink} to="/expenses" variant="text">View all</Button>}
          >
            <Stack spacing={1.5}>
              {recentTransactions.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No recent transactions found.
                </Typography>
              )}
              {recentTransactions.map((transaction) => (
                <TransactionsListItem key={transaction.id} transaction={transaction} />
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DashboardPage
