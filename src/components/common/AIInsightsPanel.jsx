import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { alpha } from '@mui/material/styles'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SectionCard from './SectionCard.jsx'

const severityColorMap = {
  low: 'success',
  medium: 'warning',
  high: 'error',
}

function getInsightIcon(severity) {
  if (severity === 'high') {
    return <WarningAmberRoundedIcon color="warning" />
  }

  if (severity === 'medium') {
    return <AutoAwesomeRoundedIcon color="primary" />
  }

  return <LightbulbRoundedIcon color="success" />
}

function AIInsightsPanel({ insights = [], generatedAt }) {
  return (
    <SectionCard
      title="AI insights"
      subtitle={
        generatedAt
          ? `Updated ${generatedAt}`
          : 'Recommendations based on your recent spending patterns'
      }
      action={
        <Button
          component={RouterLink}
          to="/ai-insights"
          variant="text"
          size="small"
          sx={{ alignItems: 'right', borderRadius: 0.5 }}
        >
          View all
        </Button>
      }
      minHeight={360}
    >
      {insights.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240, textAlign: 'center' }}>
          <AutoAwesomeRoundedIcon color="disabled" />
          <Typography variant="body2" color="text.secondary">
           AI insights will appear here after enough spending data is available.
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={1.5}>
           {insights.map((insight) => (
            <Stack
              key={insight.id}
              direction="row"
              spacing={1.5}
              alignItems="flex-start"
              sx={{
                p: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(255,255,255,0.78)',
                border: '1px solid rgba(148,163,184,0.12)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 12px 28px rgba(76, 111, 255, 0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 1,
                  display: 'grid',
                  placeItems: 'center',
                  background: (theme) => alpha(theme.palette.primary.main, 0.08),
                  flexShrink: 0,
                }}
              >
                {getInsightIcon(insight.severity)}
              </Box>
              <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
                   <Chip label={insight.source === 'ai' ? 'AI-generated' : 'Derived from data'} size="small" variant="outlined" />
                   <Chip
                     label={
                       insight.severity === 'high'
                         ? 'High impact'
                         : insight.severity === 'medium'
                         ? 'Needs attention'
                         : 'Informational'
                     }
                     size="small"
                     color={severityColorMap[insight.severity] || 'default'}
                   />
                </Stack>
                <Typography variant="subtitle2">{insight.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {insight.description}
                </Typography>
              </Stack>
              <ChevronRightRoundedIcon sx={{ color: 'text.secondary', mt: 0.5 }} />
            </Stack>
          ))}
        </Stack>
      )}
    </SectionCard>
  )
}

export default AIInsightsPanel
