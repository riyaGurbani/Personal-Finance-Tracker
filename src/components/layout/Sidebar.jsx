import { NavLink } from 'react-router-dom'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import { alpha } from '@mui/material/styles'
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { navigationItems } from './navigation.js'

function Sidebar({ pathname, onItemClick }) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1.75 }}>
      <Stack spacing={2} sx={{ px: 1, py: 1.25 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              color: 'common.white',
              background: 'linear-gradient(135deg, #4c6fff 0%, #7b61ff 100%)',
              boxShadow: '0px 12px 24px rgba(76, 111, 255, 0.22)',
            }}
          >
            <SmartToyRoundedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Expense Copilot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI Personal Finance
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <List sx={{ flexGrow: 1 }}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onItemClick}
              selected={pathname === item.path}
              sx={{
                px: 1.5,
                py: 1.1,
                borderRadius: 2.5,
                mb: 0.5,
                '&.active, &.Mui-selected': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: { sx: { fontWeight: 600, fontSize: 13 } },
                }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          border: '1px solid rgba(219,228,255,0.95)',
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.secondary.main, 0.12)} 100%)`,
        }}
      >
        <Stack spacing={1.25}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(255,255,255,0.7)',
            }}
          >
            <SmartToyRoundedIcon color="primary" />
          </Box>
          <Typography variant="subtitle2">AI is here to help</Typography>
          <Typography variant="body2" color="text.secondary">
            Ask smart questions about spending, savings, and more.
          </Typography>
          <Button variant="contained" component={NavLink} to="/ai-assistant" sx={{ alignSelf: 'flex-start' }}>
            Chat with AI
          </Button>
        </Stack>
      </Box>

      <Stack spacing={0.25} sx={{ px: 1, pt: 2 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Expense Copilot
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Smarter spending. Brighter tomorrow.
        </Typography>
      </Stack>
    </Box>
  )
}

export default Sidebar
