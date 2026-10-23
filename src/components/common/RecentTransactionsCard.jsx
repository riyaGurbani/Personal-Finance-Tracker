import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import { Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import SectionCard from './SectionCard.jsx'
import TransactionsListItem from './TransactionsListItem.jsx'

function RecentTransactionsCard({ transactions = [] }) {
  return (
    <SectionCard
      title="Recent transactions"
      subtitle="Latest activity across your tracked expenses"
      action={
        <Button component={RouterLink} to="/expenses" variant="text" size="small">
          View all
        </Button>
      }
      minHeight={360}
    >
      {transactions.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ minHeight: 240, textAlign: 'center' }}>
          <ReceiptLongRoundedIcon color="disabled" />
          <Typography variant="body2" color="text.secondary">
            No recent transactions found.
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={1.25}>
          {transactions.map((transaction) => (
            <TransactionsListItem key={transaction.id} transaction={transaction} />
          ))}
        </Stack>
      )}
    </SectionCard>
  )
}

export default RecentTransactionsCard
