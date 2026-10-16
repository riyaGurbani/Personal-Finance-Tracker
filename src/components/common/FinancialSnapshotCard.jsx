import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { alpha } from '@mui/material/styles'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'

function FinancialSnapshotCard({ greeting, summaryCards = [], topInsight, onPrimaryAction, onSecondaryAction }) {
  const primaryMetric = summaryCards[0]
  const supportingMetrics = summaryCards.slice(1, 4)

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 6,
        position: 'relative',
        overflow: 'hidden',
        minHeight: 280,
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.16)} 0%, ${alpha(theme.palette.secondary.main, 0.14)} 100%)`,
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
        boxShadow: '0px 24px 60px rgba(76, 111, 255, 0.12)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          top: -80,
          right: -60,
          background: (theme) => alpha(theme.palette.common.white, 0.24),
        }}
      />
      <Stack spacing={3} sx={{ position: 'relative' }}>
        <Stack spacing={1.25}>
          <Chip label="Your money at a glance" color="primary" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
          <Typography variant="h4" sx={{ maxWidth: 720 }}>
            {greeting?.title}
          </Typography>
          {greeting?.description ? (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              {greeting.description}
            </Typography>
          ) : null}
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {primaryMetric?.title || 'Monthly spend'}
          </Typography>
          <Typography variant="h2" sx={{ letterSpacing: '-0.04em' }}>
            {primaryMetric?.value || '—'}
          </Typography>
          {primaryMetric?.change ? (
            <Typography variant="body1" color="text.secondary">
              {primaryMetric.change}
            </Typography>
          ) : null}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap="wrap">
          {supportingMetrics.map((metric) => (
            <Box
              key={metric.id || metric.title}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                flex: 1,
                p: 2,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.62)',
                border: '1px solid rgba(255,255,255,0.5)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                {metric.title}
              </Typography>
              <Typography variant="h6" sx={{ mt: 0.5 }}>
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {metric.change}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={onPrimaryAction}
            sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
          >
            Add expense
          </Button>
          <Button
            variant="outlined"
            startIcon={<SmartToyRoundedIcon />}
            onClick={onSecondaryAction}
            sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
          >
            Ask AI
          </Button>
          {topInsight?.title ? (
            <Typography variant="body2" color="text.secondary" sx={{ ml: { sm: 'auto' }, maxWidth: 320 }}>
              <strong>Top signal:</strong> {topInsight.title}
            </Typography>
          ) : null}
        </Stack>
      </Stack>
    </Box>
  )
}

export default FinancialSnapshotCard
