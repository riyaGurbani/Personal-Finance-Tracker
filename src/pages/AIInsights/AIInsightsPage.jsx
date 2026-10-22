import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
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
    source, provider, fallbackUsed, health, isLoading, isError, healthError, isRefreshing, refreshInsights,
  } = useAIInsightsState()

  const filteredInsights = activeTab === 'Overview'
    ? insights
    : insights.filter((insight) => {
        if (activeTab === 'Alerts') return insight.severity === 'high' || insight.type === 'anomaly-detection'
        if (activeTab === 'Savings') return insight.type === 'savings-opportunity'
        return true
      })

  const healthStatus = health?.status || 'unknown'
  const isHealthy = healthStatus === 'ok'
  const healthSeverity = isHealthy ? 'success' : healthStatus === 'degraded' ? 'warning' : 'info'

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

      <Alert severity={healthSeverity} icon={isHealthy ? <CheckCircleRoundedIcon fontSize="inherit" /> : undefined}>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            AI status: <strong>{healthStatus}</strong> · Provider: <strong>{provider}</strong>
            {health?.model ? <> · Model: <strong>{health.model}</strong></> : null}
          </Typography>
          {health?.message ? <Typography variant="body2">{health.message}</Typography> : null}
          {health?.fallbackProvider ? (
            <Typography variant="body2">Fallback provider: <strong>{health.fallbackProvider}</strong></Typography>
          ) : null}
          {healthError ? <Typography variant="body2">Unable to load AI health details.</Typography> : null}
        </Stack>
      </Alert>

      <SectionCard title="Insights status" subtitle="Track freshness and regenerate the latest AI insight set.">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Last generated: {formatGeneratedAt(generatedAt)}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip label={`Source: ${source === 'ai' ? 'AI' : 'Mock'}`} color={source === 'ai' ? 'primary' : 'default'} variant="outlined" />
              <Chip label={`Provider: ${provider}`} color="secondary" variant="outlined" />
              <Chip label={fallbackUsed ? 'Fallback used' : 'Direct AI response'} color={fallbackUsed ? 'warning' : 'success'} variant="outlined" />
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
          These insights are currently coming from the mock fallback path. Refresh again after Ollama is available to generate live AI insights.
        </Alert>
      )}

      {fallbackUsed && source === 'ai' && (
        <Alert severity="warning">
          Some insights may have used fallback handling during generation. Review the provider and health status above.
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
          const icon = insight.severity === 'high' ? <WarningAmberRoundedIcon color="warning" /> : <PsychologyAltRoundedIcon color="secondary" />
          const subtitleText = severityLabelMap[insight.severity] || 'Informational'

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
                      <Typography variant="body2" color="text.secondary">{insight.summary}</Typography>
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    <Chip label={`Type: ${insight.type}`} size="small" color="primary" variant="outlined" />
                    <Chip label={`Source: ${insight.source}`} size="small" color={insight.source === 'ai' ? 'success' : 'default'} variant="outlined" />
                    <Chip label={`Provider: ${insight.provider}`} size="small" color="secondary" variant="outlined" />
                    <Chip label={insight.fallbackUsed ? 'Fallback used' : 'Direct'} size="small" color={insight.fallbackUsed ? 'warning' : 'success'} variant="outlined" />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    Generated: {formatGeneratedAt(insight.generatedAt || generatedAt)}
                  </Typography>
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

