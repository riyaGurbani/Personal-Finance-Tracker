import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Button, Grid, Stack, TextField, Typography, Box } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'

function ExpenseHistoryPage() {
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
            <TextField fullWidth placeholder="Search by merchant or description" InputProps={{ startAdornment: <SearchRoundedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="All Categories" />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="All Payment Methods" />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="Min Amount" />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField fullWidth placeholder="Max Amount" />
          </Grid>
        </Grid>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {[
            ['Total Expenses', '₹48,750'],
            ['Number of Transactions', '28'],
            ['Average Transaction Value', '₹1,741'],
          ].map(([label, value]) => (
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
      </SectionCard>
    </Stack>
  )
}

export default ExpenseHistoryPage
