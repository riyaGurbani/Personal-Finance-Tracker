import { Box, Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import SummaryMetricCard from '../../components/common/SummaryMetricCard.jsx'
import { useDashboardState } from './state.js'

function DashboardPage() {
  const {
    greeting,
    summaryCards,
    trend,
    categoryBreakdown,
    aiInsight,
    recentTransactions,
    isLoading,
    isError,
  } = useDashboardState()

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
            subtitle="Last 6 months"
            action={<Button variant="text">Last 6 Months</Button>}
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
                    <Box key={height} sx={{ flex: 1, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 0,
                          width: 10,
                          height: `${height}%`,
                          transform: 'translateX(-50%)',
                          borderRadius: 999,
                          background: index === 5 ? 'linear-gradient(180deg, #4c6fff 0%, #7b61ff 100%)' : 'rgba(76,111,255,0.18)',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
                <Chip
                  label={trend?.label}
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                />
              </Box>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard
            title="Category Breakdown"
            subtitle="Placeholder donut summary"
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
                  <Typography variant="subtitle2">{categoryBreakdown?.total}</Typography>
                </Box>
              </Box>
              <Stack spacing={1} sx={{ width: '100%' }}>
                {(categoryBreakdown?.items || []).map(({ label, color }) => (
                  <Stack key={label} direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
                      <Typography variant="body2" color="text.secondary">
                        {label}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard
            title={aiInsight?.title}
            subtitle={aiInsight?.subtitle}
          >
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                {aiInsight?.description}
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button variant="contained" size="small">
                  Ask AI for details
                </Button>
                <Button variant="outlined" size="small">
                  View all insights
                </Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard
            title="Recent Transactions"
            subtitle="Latest categorized expenses captured by the assistant"
            action={<Button variant="text">View all</Button>}
          >
            <Stack spacing={2}>
              {recentTransactions.map((transaction) => (
                <Stack
                  key={transaction.id}
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(148,163,184,0.18)',
                    backgroundColor: 'rgba(255,255,255,0.72)',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">{transaction.merchant}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.category} • {transaction.time}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2">{transaction.amount}</Typography>
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
