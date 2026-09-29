import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { Button, Chip, Grid, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'

function AIInsightsPage() {
  return (
    <Stack spacing={3}>
      <PageIntro
        title="AI-Generated Insights"
        description="Review trends, anomalies, predictions, and savings opportunities identified from your expense data."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Overview" color="primary" />
            <Chip label="Spending Trends" variant="outlined" />
            <Chip label="Anomalies" variant="outlined" />
            <Chip label="Recommendations" variant="outlined" />
            <Chip label="Predictions" variant="outlined" />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Food expenses increased by 18%" subtitle="Your Food & Dining expenses are 18% higher than last month.">
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                Financial impact: +₹2,150 · Confidence: 92%
              </Typography>
              <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                Ask AI
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Unusual subscriptions" subtitle="One subscription has not been actively used but costs ₹1,249 per month.">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <WarningAmberRoundedIcon color="warning" />
              <Typography variant="body2" color="text.secondary">
                Financial impact: ₹1,249 · Confidence: 87%
              </Typography>
            </Stack>
            <Button variant="outlined" size="small" sx={{ mt: 2, alignSelf: 'flex-start' }}>
              Ask AI
            </Button>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Weekend spending is 42% higher" subtitle="You spend more on weekends than weekdays.">
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                Financial impact: ₹780 · Confidence: 76%
              </Typography>
              <Button variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                Ask AI
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Budget risk ahead" subtitle="Based on current spending rate, you may exceed your monthly budget by ₹2,800.">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <PsychologyAltRoundedIcon color="secondary" />
              <Typography variant="body2" color="text.secondary">
                Financial impact: +₹2,800 · Confidence: 84%
              </Typography>
            </Stack>
            <Button variant="outlined" size="small" sx={{ mt: 2, alignSelf: 'flex-start' }}>
              Ask AI
            </Button>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AIInsightsPage
