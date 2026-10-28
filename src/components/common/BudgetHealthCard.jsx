import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { Box, Chip, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard.jsx'

function BudgetHealthCard({ budgetLabel, budgetUsedPercentage = 0, categoryBreakdown = [] }) {
  const isOnTrack = budgetUsedPercentage <= 80

  return (
    <SectionCard
      title="Budget health"
      subtitle="Track how your monthly budget is pacing across top categories"
      minHeight={360}
    >
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row', lg: 'column', xl: 'row' }} spacing={2.5} alignItems="center">
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={150}
              thickness={4}
              sx={{ color: 'rgba(148,163,184,0.18)' }}
            />
            <CircularProgress
              variant="determinate"
              value={budgetUsedPercentage}
              size={150}
              thickness={4}
              sx={{ color: isOnTrack ? 'success.main' : 'warning.main', position: 'absolute', left: 0 }}
            />
            <Stack
              spacing={0.25}
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'absolute', inset: 0 }}
            >
              <Typography variant="h5">{budgetUsedPercentage}%</Typography>
              <Typography variant="caption" color="text.secondary">
                used
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={1.25} sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {budgetLabel || 'Budget unavailable'} used this month
            </Typography>
            <Chip
              icon={isOnTrack ? <CheckCircleRoundedIcon /> : <ErrorOutlineRoundedIcon />}
              label={isOnTrack ? 'On track' : 'Needs attention'}
              color={isOnTrack ? 'success' : 'warning'}
              sx={{ alignSelf: 'flex-start' }}
            />
            <Box
              sx={{
                p: 1.75,
                borderRadius: 3,
                backgroundColor: 'rgba(76,111,255,0.06)',
                border: '1px solid rgba(76,111,255,0.12)',
              }}
            >
              <Typography variant="subtitle2">
                {isOnTrack ? "You're doing great!" : 'Budget is tightening'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {isOnTrack
                  ? 'Keep tracking your top categories to stay on budget.'
                  : 'Review your highest categories and reduce non-essential spending.'}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        <Stack spacing={1.5}>
          {categoryBreakdown.map((item) => (
            <Stack key={item.label} spacing={0.75}>
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.formattedAmount}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: 'rgba(148,163,184,0.16)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 999,
                    backgroundColor: item.color,
                  },
                }}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </SectionCard>
  )
}

export default BudgetHealthCard

