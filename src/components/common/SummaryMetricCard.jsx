import { alpha } from '@mui/material/styles'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import SouthRoundedIcon from '@mui/icons-material/SouthRounded'
import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'

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
        <Stack spacing={2.25}>
          <Stack direction="row" sx={{justifyContent: 'space-between'}} >
            <Stack spacing={0.75} sx={{ minWidth: 0 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="h5" sx={{ letterSpacing: '-0.03em' }}>
                {value}
              </Typography>
            </Stack>
            <Stack
              sx={{
                width: 52,
                height: 52,
                borderRadius: 4,
                color,
                backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                boxShadow: (theme) => `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.08)}`,
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                '& .MuiSvgIcon-root': {
                  fontSize: 24,
                  display: 'block',
                },
              }}
            >
              <IconComponent />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
            <Chip label="Monthly signal" size="small" variant="outlined" icon={<SouthRoundedIcon sx={{ transform: 'rotate(180deg)' }} />} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {change}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SummaryMetricCard
