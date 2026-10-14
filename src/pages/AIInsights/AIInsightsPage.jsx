import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded'
import { alpha } from '@mui/material/styles'
import { Alert, Box, Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useAIInsightsState } from './state.js'

const severityLabelMap = {
  low: 'Low impact',
  medium: 'Needs attention',
  high: 'High priority',
  info: 'Informational',
}

function formatGeneratedAt(value) {
  if (!value) return 'Not generated yet'
  return new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
}

function AIInsightsPage() {
  const {
    tabs, activeTab, setActiveTab, insights, generatedAt,
    source, isLoading, isError, isRefreshing, refreshInsights,
  } = useAIInsightsState()

  const filteredInsights = activeTab === 'Overview'
    ? insights
    : insights.filter((insight) => {
        if (activeTab === 'Alerts') return insight.tone === 'warning'
        if (activeTab === 'Savings') return insight.id === 'savings-opportunity' || insight.tone === 'info'
        return true
      })

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 320 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError) {
    return (
      <SectionCard title="AI insights unavailable" subtitle="Unable to load AI insights right now.">
        <Typography variant="body2" color="text.secondary">Please try again later.</Typography>
      </SectionCard>
    )
  }

  return (
    <Stack spacing={3}>
      <PageIntro
        eyebrow="AI insight workspace"
        title="AI-Generated Insights"
        description="Review trends, anomalies, predictions, and savings opportunities identified from your expense data."
      />

      <SectionCard title="Insights status" subtitle="Track freshness and regenerate the latest AI insight set.">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Last generated: {formatGeneratedAt(generatedAt)}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label={source === 'mock' ? 'Source: Placeholder' : 'Source: Live backend'} color={source === 'mock' ? 'default' : 'primary'} variant="outlined" />
              <Chip label={`${insights.length} insight${insights.length !== 1 ? 's' : ''}`} color="secondary" variant="outlined" />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            startIcon={isRefreshing ? <CircularProgress size={16} color="inherit" /> : <RefreshRoundedIcon />}
            onClick={() => refreshInsights()}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Insights'}
          </Button>
        </Stack>
      </SectionCard>

      {source === 'mock' && (
        <Alert severity="info">
          These are placeholder insights. Click <strong>Refresh Insights</strong> to generate live AI insights from your expense history.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {tabs.map((tab) => (
              <Chip
                key={tab}
                label={tab}
                color={tab === activeTab ? 'primary' : 'default'}
                variant={tab === activeTab ? 'filled' : 'outlined'}
                onClick={() => setActiveTab(tab)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Grid>
        {filteredInsights.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ p: 4, borderRadius: 4, border: '1px dashed rgba(148,163,184,0.3)', textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No insights found for <strong>{activeTab}</strong>. Try refreshing or switching tabs.
              </Typography>
            </Box>
          </Grid>
        )}
        {filteredInsights.map((insight) => {
          const icon = insight.tone === 'warning' ? <WarningAmberRoundedIcon color="warning" /> : <PsychologyAltRoundedIcon color="secondary" />
          const subtitleText = insight.subtitle?.startsWith('Severity:')
            ? (severityLabelMap[insight.tone] || severityLabelMap[insight.severity] || 'Informational')
            : insight.subtitle

          return (
            <Grid key={insight.id} size={{ xs: 12, md: 6 }}>
              <SectionCard title={insight.title} subtitle={subtitleText}>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      background: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      {icon}
                      <Typography variant="body2" color="text.secondary">{insight.impact}</Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Chip label={insight.source === 'backend' ? 'Live insight' : 'Placeholder'} size="small" color={insight.source === 'backend' ? 'primary' : 'default'} variant="outlined" />
                    <Chip label={insight.tone === 'warning' ? 'Needs attention' : 'Opportunity'} size="small" color={insight.tone === 'warning' ? 'warning' : 'secondary'} variant="outlined" />
                  </Stack>
                  <Stack direction="row" spacing={1.5}>
                    <Button variant="contained" size="small" startIcon={<TipsAndUpdatesRoundedIcon />} onClick={() => refreshInsights()}>
                      Explain insight
                    </Button>
                    <Button variant="outlined" size="small" href="/expenses">
                      Track this
                    </Button>
                  </Stack>
                </Stack>
              </SectionCard>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default AIInsightsPage

