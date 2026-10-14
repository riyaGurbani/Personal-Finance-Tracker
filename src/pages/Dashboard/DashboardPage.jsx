import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import { alpha } from '@mui/material/styles'
import { Box, Button, Chip, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import SummaryMetricCard from '../../components/common/SummaryMetricCard.jsx'
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
        eyebrow="Financial command center"
        title={greeting?.title}
        description={greeting?.description}
      />

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
          <SectionCard
            title="Category Breakdown"
            subtitle="Your most active spending categories this period"
            minHeight={320}
          >
            <Stack spacing={2.5} alignItems="center">
              <Box
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background:
                    'conic-gradient(#4c6fff 0deg 110deg, #7b61ff 110deg 190deg, #22c55e 190deg 250deg, #f59e0b 250deg 310deg, #e879f9 310deg 360deg)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 92,
                    height: 92,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Stack alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, lineHeight: 1.2 }}>Total</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{categoryBreakdown?.total}</Typography>
                  </Stack>
                </Box>
              </Box>
              <Stack spacing={1} sx={{ width: '100%' }}>
                {(categoryBreakdown?.items || []).map(({ label, color, percentage }) => (
                  <Stack
                    key={label}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.25,
                      borderRadius: 3,
                      backgroundColor: 'rgba(248,250,252,0.9)',
                      border: '1px solid rgba(148,163,184,0.12)',
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                      <Typography variant="body2" color="text.secondary">
                        {label}
                      </Typography>
                    </Stack>
                    {percentage != null && (
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {percentage}%
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard
            title="AI Highlights"
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
              {aiInsights.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No insights available yet.
                </Typography>
              )}
              {aiInsights.map((insight) => (
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
                  View all insights
                </Button>
              </Box>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard
            title="Recent Transactions"
            subtitle="Latest categorized expenses captured by the assistant"
            action={<Button component={RouterLink} to="/expenses" variant="text">View all</Button>}
          >
            <Stack spacing={1.5}>
              {recentTransactions.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No recent transactions found.
                </Typography>
              )}
              {recentTransactions.map((transaction) => (
                <Stack
                  key={transaction.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={1.5}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(148,163,184,0.18)',
                    backgroundColor: 'rgba(255,255,255,0.72)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 16px 32px rgba(76, 111, 255, 0.08)',
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 3,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        background: (theme) =>
                          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', fontSize: 13 }}>
                        {transaction.merchant?.charAt(0)?.toUpperCase() || '?'}
                      </Typography>
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>{transaction.merchant}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {transaction.category} • {transaction.time}
                      </Typography>
                    </Box>
                  </Stack>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: 'text.primary', flexShrink: 0 }}>
                    {transaction.amount}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default DashboardPage
