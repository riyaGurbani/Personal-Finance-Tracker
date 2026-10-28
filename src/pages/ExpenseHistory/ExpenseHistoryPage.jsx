import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import { alpha } from '@mui/material/styles'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import ExpenseHistoryListItem from './components/ExpenseHistoryListItem.jsx'
import { useExpenseHistoryState } from './state.js'

function ExpenseHistoryPage() {
  const {
    filters,
    stats,
    transactions,
    pagination,
    availableCategories,
    availablePaymentMethods,
    updateFilter,
    resetFilters,
    isLoading,
    isError,
  } = useExpenseHistoryState()

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
        eyebrow="Search and review"
        title="Expense History"
        description="Review, search, and analyze your previous transactions."
      />

      <SectionCard
        title="Transaction list"
        subtitle="Filter, sort, and review every recorded expense in one place."
        action={
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<FilterAltOffRoundedIcon />} onClick={resetFilters}>
              Reset Filters
            </Button>
          </Stack>
        }
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 4,
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', md: 'center' }}>
            <TuneRoundedIcon color="primary" />
            <Typography variant="body2" color="text.secondary">
              Use filters to narrow down merchants, categories, payment methods, and spend ranges without leaving the page.
            </Typography>
          </Stack>
        </Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              placeholder="Search by merchant or description"
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
              slotProps={{
                input: {
                  startAdornment: <SearchRoundedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField select fullWidth label="Category" value={filters.category} onChange={(event) => updateFilter('category', event.target.value)}>
              <MenuItem value="">All Categories</MenuItem>
              {availableCategories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField select fullWidth label="Payment Method" value={filters.paymentMethod} onChange={(event) => updateFilter('paymentMethod', event.target.value)}>
              <MenuItem value="">All Payment Methods</MenuItem>
              {availablePaymentMethods.map((paymentMethod) => (
                <MenuItem key={paymentMethod} value={paymentMethod}>{paymentMethod}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth label="Min Amount" type="number" value={filters.minAmount} onChange={(event) => updateFilter('minAmount', event.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth label="Max Amount" type="number" value={filters.maxAmount} onChange={(event) => updateFilter('maxAmount', event.target.value)} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField select fullWidth label="Sort By" value={filters.sortBy} onChange={(event) => updateFilter('sortBy', event.target.value)}>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
              <MenuItem value="merchant">Merchant</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField select fullWidth label="Order" value={filters.order} onChange={(event) => updateFilter('order', event.target.value)}>
              <MenuItem value="desc">Descending</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
            </TextField>
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
        <Stack spacing={1.5}>
          {transactions.length === 0 && (
            <Box
              sx={{
                p: 5,
                borderRadius: 4,
                border: '1px dashed rgba(148,163,184,0.3)',
                textAlign: 'center',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                No transactions found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your filters or reset them to see all expenses.
              </Typography>
              <Button variant="outlined" startIcon={<FilterAltOffRoundedIcon />} onClick={resetFilters} sx={{ mt: 2 }}>
                Reset Filters
              </Button>
            </Box>
          )}
          {transactions.map((transaction) => (
            <ExpenseHistoryListItem key={transaction.id} transaction={transaction} />
          ))}
        </Stack>
        {pagination ? (
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Page {pagination.page} of {pagination.totalPages} • {pagination.total} total transactions
            </Typography>
            <Pagination
              color="primary"
              page={pagination.page}
              count={Math.max(pagination.totalPages, 1)}
              onChange={(_, page) => updateFilter('page', page)}
            />
          </Stack>
        ) : null}
      </SectionCard>
    </Stack>
  )
}

export default ExpenseHistoryPage
