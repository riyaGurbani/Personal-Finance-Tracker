import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Button, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useAIInsightsState } from './state.js'

function AIInsightsPage() {
  const { tabs, activeTab, insights, isLoading, isError } = useAIInsightsState()

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
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </SectionCard>
    )
  }

  return (
    <Stack spacing={3}>
      <PageIntro
        title="AI-Generated Insights"
        description="Review trends, anomalies, predictions, and savings opportunities identified from your expense data."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {tabs.map((tab) => (
              <Chip key={tab} label={tab} color={tab === activeTab ? 'primary' : 'default'} variant={tab === activeTab ? 'filled' : 'outlined'} />
            ))}
          </Stack>
        </Grid>
        {insights.map((insight) => {
          const icon = insight.tone === 'warning' ? <WarningAmberRoundedIcon color="warning" /> : <PsychologyAltRoundedIcon color="secondary" />

          return (
            <Grid key={insight.id} size={{ xs: 12, md: 6 }}>
              <SectionCard title={insight.title} subtitle={insight.subtitle}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {icon}
                  <Typography variant="body2" color="text.secondary">
                    {insight.impact}
                  </Typography>
                </Stack>
                <Button variant="outlined" size="small" sx={{ mt: 2, alignSelf: 'flex-start' }}>
                  Ask AI
                </Button>
              </SectionCard>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default AIInsightsPage
