import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Link as RouterLink } from 'react-router-dom'
import SectionCard from './SectionCard.jsx'

function CategoryBreakdownCard({ items = [], totalLabel }) {
  const hasData = items.length > 0

  return (
    <SectionCard
      title="Category breakdown"
      subtitle="Top spending categories"
      action={
        <Button component={RouterLink} to="/expenses" variant="text" size="small">
          View all
        </Button>
      }
      minHeight={360}
    >
      {!hasData ? (
        <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240, textAlign: 'center' }}>
          <DonutLargeRoundedIcon color="disabled" />
          <Typography variant="body2" color="text.secondary">
            Category insights will appear after more transactions are categorized.
          </Typography>
        </Stack>
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ xs: 'stretch', md: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 240, height: 220, mx: 'auto', position: 'relative' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={items}
                  dataKey="amount"
                  nameKey="label"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="none"
                >
                  {items.map((item) => (
                    <Cell key={item.label} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
            <Stack
              spacing={0.25}
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            >
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h6">{totalLabel}</Typography>
            </Stack>
          </Box>

          <Stack spacing={1.25} sx={{ flex: 1 }}>
            {items.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.78)',
                  border: '1px solid rgba(148,163,184,0.12)',
                }}
              >
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.formattedAmount}
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="subtitle2">{item.percentage}%</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </SectionCard>
  )
}

export default CategoryBreakdownCard
