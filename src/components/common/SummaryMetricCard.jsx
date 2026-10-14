import { alpha } from '@mui/material/styles'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { Card, CardContent, Stack, Typography } from '@mui/material'

function SummaryMetricCard({ title, value, change, icon, color = 'primary.main' }) {
  const IconComponent = icon || TrendingUpRoundedIcon

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,249,255,0.96) 100%)',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={0.75}>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h5">{value}</Typography>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 52,
                height: 52,
                borderRadius: 4,
                color,
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                boxShadow: (theme) => `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)}`,
              }}
            >
              <IconComponent />
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minHeight: 44 }}>
            {change}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SummaryMetricCard
