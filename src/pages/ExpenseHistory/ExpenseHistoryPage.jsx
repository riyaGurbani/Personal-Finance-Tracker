import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Button, CircularProgress, Grid, Stack, TextField, Typography, Box } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useExpenseHistoryState } from './state.js'

function ExpenseHistoryPage() {
  const { filters, stats, transactions, isLoading, isError } = useExpenseHistoryState()

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 320 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError) {
    return (
      <SectionCard title="Expense history unavailable" subtitle="Unable to load expense history right now.">
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </SectionCard>
    )
  }

  return (
    <Stack spacing={3}>
      <PageIntro
        title="Expense History"
        description="Review, search, and analyze your previous transactions."
      />

      <SectionCard
        title="Transaction list"
        subtitle="Expense history table placeholder"
        action={
          <Button variant="outlined" startIcon={<FilterListRoundedIcon />}>
            Apply Filters
          </Button>
        }
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField fullWidth placeholder="Search by merchant or description" defaultValue={filters?.search} InputProps={{ startAdornment: <SearchRoundedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="All Categories" defaultValue={filters?.category} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="All Payment Methods" defaultValue={filters?.paymentMethod} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="Min Amount" defaultValue={filters?.minAmount} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="Max Amount" defaultValue={filters?.maxAmount} />
          </Grid>
        </Grid>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {stats.map(({ label, value }) => (
            <Box
              key={label}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 4,
                border: '1px solid rgba(148,163,184,0.18)',
                backgroundColor: 'rgba(248,250,252,0.9)',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
              <Typography variant="h6">{value}</Typography>
            </Box>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Detailed transaction table, pagination, and review actions will be added next.
        </Typography>
        <Stack spacing={1.5}>
          {transactions.map((transaction) => (
            <Box
              key={transaction.id}
              sx={{
                p: 2,
                borderRadius: 4,
                border: '1px solid rgba(148,163,184,0.18)',
                backgroundColor: 'rgba(255,255,255,0.72)',
              }}
            >
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="body2" color="text.secondary">{transaction.date}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="subtitle2">{transaction.merchant}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="body2">{transaction.category}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="body2">{transaction.paymentMethod}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="body2">{transaction.amount}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                  <Typography variant="body2" color="success.main">{transaction.aiStatus}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Stack>
      </SectionCard>
    </Stack>
  )
}

export default ExpenseHistoryPage
