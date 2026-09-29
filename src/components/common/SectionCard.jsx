import { Card, CardContent, Stack, Typography } from '@mui/material'

function SectionCard({ title, subtitle, action, children, minHeight }) {
  return (
    <Card sx={{ height: '100%', minHeight }}>
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1.5}
          >
            <Stack spacing={0.75}>
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
            {action || null}
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SectionCard
