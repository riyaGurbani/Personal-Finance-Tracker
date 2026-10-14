import { alpha } from '@mui/material/styles'
import { Box, Chip, Stack, Typography } from '@mui/material'

function PageIntro({ eyebrow, title, description }) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 6,
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          top: -60,
          right: -40,
          background: (theme) => alpha(theme.palette.common.white, 0.28),
        }}
      />
      <Stack spacing={1.25} sx={{ position: 'relative' }}>
        {eyebrow ? <Chip label={eyebrow} color="primary" variant="outlined" sx={{ alignSelf: 'flex-start' }} /> : null}
        <Typography variant="h4" sx={{ maxWidth: 760 }}>
          {title}
        </Typography>
        {description ? (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            {description}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  )
}

export default PageIntro
