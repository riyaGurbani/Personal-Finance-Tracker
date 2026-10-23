import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import {
  AppBar,
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { getPageTitle, navigationItems } from './navigation.js'
import AIProviderSelect from './AIProviderSelect.jsx'

const drawerWidth = 280

function AppLayout() {
  const theme = useTheme()
  const location = useLocation()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)

  const pageTitle = useMemo(() => getPageTitle(location.pathname), [location.pathname])

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  const drawerContent = (
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
              onClick={handleDrawerClose}
              selected={location.pathname === item.path}
              sx={{
                px: 1.5,
                py: 1.1,
                borderRadius: 2.5,
                mb: 0.5,
                '&.active, &.Mui-selected': {
                  backgroundColor: (muiTheme) => alpha(muiTheme.palette.primary.main, 0.1),
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
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.12,
          )} 100%)`,
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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              p: 1,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
        <AppBar position="sticky" elevation={0}>
          <Toolbar
            sx={{
              minHeight: 80,
              px: { xs: 2, md: 3, lg: 4 },
              gap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
              {!isLargeScreen ? (
                <IconButton onClick={handleDrawerToggle} edge="start" aria-label="open navigation">
                  <MenuRoundedIcon />
                </IconButton>
              ) : null}
              <TextField
                placeholder="Search expenses, categories, or ask anything..."
                size="small"
                sx={{ width: '100%', maxWidth: 420, display: { xs: 'none', sm: 'flex' } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Chip label="⌘K" size="small" sx={{ height: 24, borderRadius: 2, bgcolor: 'rgba(148,163,184,0.12)' }} />
                    ),
                  },
                }}
              />
              <IconButton aria-label="search expenses" sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                <SearchRoundedIcon />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ justifyContent: 'flex-end' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <AIProviderSelect />
              </Box>
              <Button
                variant="outlined"
                startIcon={<CalendarTodayRoundedIcon />}
                endIcon={<KeyboardArrowDownRoundedIcon />}
                sx={{ display: { xs: 'none', md: 'inline-flex' }, bgcolor: 'background.paper' }}
              >
                This Month
              </Button>
              <Chip
                icon={<SmartToyRoundedIcon />}
                label={pageTitle}
                variant="outlined"
                sx={{ display: { xs: 'none', xl: 'inline-flex' } }}
              />
              <Button
                component={NavLink}
                to="/expenses/add"
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{
                  minWidth: { xs: 0, sm: 'auto' },
                  px: { xs: 1.25, sm: 2 },
                  '& .MuiButton-startIcon': {
                    mr: { xs: 0, sm: 1 },
                  },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Add Expense
                </Box>
              </Button>
              <IconButton aria-label="notifications">
                <Badge color="error" variant="dot">
                  <NotificationsNoneRoundedIcon />
                </Badge>
              </IconButton>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.main', fontSize: 14 }}>M</Avatar>
                <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                  <Typography variant="subtitle2">Mohan</Typography>
                </Box>
                <KeyboardArrowDownRoundedIcon sx={{ display: { xs: 'none', lg: 'block' }, color: 'text.secondary', fontSize: 18 }} />
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            px: { xs: 2, md: 3, lg: 4 },
            py: { xs: 2, md: 3, lg: 4 },
            pb: { xs: 11, md: 4 },
          }}
        >
          <Outlet />
        </Box>

        {isMobile ? (
          <Box
            sx={{
              position: 'fixed',
              left: 12,
              right: 12,
              bottom: 12,
              zIndex: theme.zIndex.appBar,
            }}
          >
            <BottomNavigation
              showLabels
              value={location.pathname}
              sx={{
                borderRadius: 4,
                boxShadow: '0px 18px 40px rgba(15, 23, 42, 0.16)',
                border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                overflowX: 'auto',
                justifyContent: 'space-between',
              }}
            >
              {[navigationItems[0], navigationItems[1], navigationItems[2], navigationItems[4], navigationItems[6]].map((item) => {
                const Icon = item.icon
                return (
                  <BottomNavigationAction
                    key={item.path}
                    label={item.label}
                    value={item.path}
                    icon={<Icon />}
                    component={NavLink}
                    to={item.path}
                  />
                )
              })}
            </BottomNavigation>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default AppLayout
