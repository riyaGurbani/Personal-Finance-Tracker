import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import SectionCard from './SectionCard.jsx'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: value >= 1000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value)
}

function SpendingTrendCard({ data = [], totalLabel }) {
  const hasData = data.some((item) => item.amount > 0)

  return (
    <SectionCard
      title="Spending trend"
      subtitle="Your spending over the last 6 months"
      action={
        <TextField
          select
          size="small"
          value="last-6-months"
          sx={{ minWidth: 140 }}
          slotProps={{
            select: {
              IconComponent: KeyboardArrowDownRoundedIcon,
            },
          }}
        >
          <MenuItem value="last-6-months">Last 6 months</MenuItem>
        </TextField>
      }
      minHeight={360}
    >
      {!hasData ? (
        <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240, textAlign: 'center' }}>
          <TrendingUpRoundedIcon color="disabled" />
          <Typography variant="body2" color="text.secondary">
            Spending trend data will appear once monthly expenses are available.
          </Typography>
        </Stack>
      ) : (
        <Box sx={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={data} barGap={12} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.18)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                cursor={{ fill: 'rgba(76,111,255,0.08)' }}
                formatter={(value) => [formatCurrency(value), 'Spend']}
                contentStyle={{ borderRadius: 16, border: '1px solid rgba(219,228,255,0.95)', boxShadow: '0px 16px 40px rgba(76, 111, 255, 0.12)' }}
              />
              <Bar dataKey="amount" radius={[12, 12, 0, 0]} maxBarSize={42}>
                {data.map((entry, index) => (
                  <Cell
                    key={entry.month}
                    fill={index === data.length - 1 ? '#4c6fff' : 'rgba(76,111,255,0.22)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}

      {hasData ? (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Current tracked spend:
          </Typography>
          <Typography variant="subtitle2">{totalLabel}</Typography>
        </Stack>
      ) : null}
    </SectionCard>
  )
}

export default SpendingTrendCard
