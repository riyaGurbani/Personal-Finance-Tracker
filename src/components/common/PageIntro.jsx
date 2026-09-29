import { Stack, Typography } from '@mui/material'

function PageIntro({ eyebrow, title, description }) {
  return (
    <Stack spacing={1}>
      {eyebrow ? (
        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 700 }}>
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h4">{title}</Typography>
      {description ? (
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default PageIntro
