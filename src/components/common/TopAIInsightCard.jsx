import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { alpha } from '@mui/material/styles'
import { Button, Chip, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard.jsx'

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

function TopAIInsightCard({ insight, generatedAt, onReview, onAskAi }) {
  return (
    <SectionCard
      title="Priority insight"
      subtitle={generatedAt ? `Updated ${generatedAt}` : 'Most important AI recommendation right now'}
      minHeight={280}
    >
      <Stack spacing={2.5}>
        <Stack
          direction="row"
          spacing={1.25}
          alignItems="flex-start"
          sx={{
            p: 2,
            borderRadius: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.14)} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
          }}
        >
          <WarningAmberRoundedIcon color="warning" />
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              <Chip
                label={severityLabelMap[insight?.severity] || 'AI signal'}
                color={severityColorMap[insight?.severity] || 'primary'}
                size="small"
              />
              <Chip label={insight?.source || 'AI'} size="small" variant="outlined" />
            </Stack>
            <Typography variant="h6">{insight?.title || 'No priority insight available'}</Typography>
            <Typography variant="body2" color="text.secondary">
              {insight?.description || 'New recommendations will appear here as your spending data updates.'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button variant="contained" onClick={onReview}>
            Review insight
          </Button>
          <Button variant="outlined" startIcon={<SmartToyRoundedIcon />} onClick={onAskAi}>
            Ask AI why
          </Button>
        </Stack>
      </Stack>
    </SectionCard>
  )
}

export default TopAIInsightCard
