import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import { Avatar, Chip, IconButton, Stack, Typography } from '@mui/material'

function TransactionsListItem({ transaction }) {
  const merchantInitial = transaction?.merchant?.charAt(0)?.toUpperCase() || 'T'

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
      sx={{
        p: 1.5,
        borderRadius: 3,
        border: '1px solid rgba(148,163,184,0.14)',
        backgroundColor: 'rgba(255,255,255,0.78)',
      }}
    >
      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: 14 }}>{merchantInitial}</Avatar>
      <Stack spacing={0.35} sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {transaction?.merchant}
        </Typography>
        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {transaction?.category}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            • {transaction?.time}
          </Typography>
          <Chip icon={<SmartToyRoundedIcon />} label="AI tagged" size="small" variant="outlined" />
        </Stack>
      </Stack>
      <Stack alignItems="flex-end" spacing={0.5} sx={{ flexShrink: 0 }}>
        <Typography variant="subtitle2" sx={{ color: transaction?.amountValue > 0 ? 'error.main' : 'text.primary' }}>
          {transaction?.amount}
        </Typography>
        <IconButton size="small" aria-label="transaction actions">
          <MoreHorizRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default TransactionsListItem
