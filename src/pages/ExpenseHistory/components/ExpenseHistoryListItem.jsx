import { Box, Chip, Grid, Typography } from '@mui/material'

function ExpenseHistoryListItem({ transaction }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid rgba(148,163,184,0.18)',
        backgroundColor: 'rgba(255,255,255,0.72)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 16px 32px rgba(76, 111, 255, 0.08)',
        },
      }}
    >
      <Grid container spacing={1} alignItems="center">
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: { md: 'none' }, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Date</Typography>
          <Typography variant="body2" color="text.secondary">{transaction.date}</Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: { md: 'none' }, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Merchant</Typography>
          <Typography variant="subtitle2">{transaction.merchant}</Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: { md: 'none' }, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Category</Typography>
          <Typography variant="body2">{transaction.category}</Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: { md: 'none' }, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Payment</Typography>
          <Typography variant="body2">{transaction.paymentMethod}</Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <Typography variant="caption" color="text.disabled" sx={{ display: { md: 'none' }, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Amount</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{transaction.amount}</Typography>
        </Grid>
        <Grid size={{ xs: 6, md: 2 }}>
          <Chip
            label={transaction.aiStatus}
            size="small"
            color={transaction.aiStatus === 'AI categorized' ? 'secondary' : 'default'}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExpenseHistoryListItem
