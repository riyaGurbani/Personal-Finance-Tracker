import CircleIcon from '@mui/icons-material/Circle'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useAIProvider } from '../../context/useAIProvider.js'

function getStatusColor(available, theme) {
  if (available) {
    return theme.palette.success.main
  }

  return theme.palette.error.main
}

function AIProviderSelect() {
  const theme = useTheme()
  const { selectedProviderId, providerStatuses, selectProvider } = useAIProvider()
  const options = providerStatuses.length ? providerStatuses : [{ id: 'mock', label: 'Mock', available: true }]

  return (
    <Select
      size="small"
      value={selectedProviderId}
      onChange={(event) => selectProvider(event.target.value)}
      displayEmpty
      IconComponent={KeyboardArrowDownRoundedIcon}
      sx={{
        minWidth: 150,
        height: 40,
        bgcolor: 'background.paper',
        borderRadius: 2.5,
        '& .MuiSelect-select': {
          py: 1,
          display: 'flex',
          alignItems: 'center',
        },
      }}
      renderValue={(value) => {
        const provider = options.find((entry) => entry.id === value)
        const label = provider?.label || 'Mock'
        const available = provider?.available ?? true

        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <SmartToyRoundedIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              AI Provider
            </Typography>
            <CircleIcon sx={{ fontSize: 10, color: getStatusColor(available, theme) }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {label}
            </Typography>
          </Stack>
        )
      }}
    >
      {options.map((provider) => (
        <MenuItem key={provider.id} value={provider.id} disabled={!provider.available}>
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ width: '100%' }}>
            <CircleIcon sx={{ fontSize: 10, color: getStatusColor(provider.available, theme) }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {provider.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {provider.available ? 'Available' : 'Unavailable'}
              </Typography>
            </Box>
            {provider.id === selectedProviderId ? (
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  color: 'primary.main',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                ✓
              </Box>
            ) : null}
          </Stack>
        </MenuItem>
      ))}
    </Select>
  )
}

export default AIProviderSelect
