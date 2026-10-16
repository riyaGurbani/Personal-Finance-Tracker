import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import SectionCard from './SectionCard.jsx'

function BudgetHealthCard({ summaryCards = [], categoryBreakdown }) {
  const budgetCard = summaryCards.find((card) => /budget/i.test(card.title))
  const totalCategories = categoryBreakdown?.items || []

  return (
    <SectionCard
      title="Budget health"
      subtitle="Track how your monthly budget is pacing across top categories"
      minHeight={320}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Monthly budget status
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5 }}>
            {budgetCard?.value || '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {budgetCard?.change || 'Budget pacing details unavailable.'}
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          {totalCategories.map((item, index) => {
            const percentage = item.percentage ?? Math.max(20, 82 - index * 14)

            return (
              <Stack key={item.label} spacing={0.75}>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {percentage}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
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
            )
          })}
        </Stack>

        <Box
          sx={{
            p: 1.75,
            borderRadius: 3,
            backgroundColor: 'rgba(76,111,255,0.06)',
            border: '1px solid rgba(76,111,255,0.12)',
          }}
        >
          <Typography variant="subtitle2">Safe-to-spend guidance</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Focus on your top two categories first to protect the remaining monthly budget.
          </Typography>
        </Box>
      </Stack>
    </SectionCard>
  )
}

export default BudgetHealthCard
