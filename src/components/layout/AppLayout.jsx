import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Stack spacing={1.5} sx={{ px: 1, py: 1.5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
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
              AI Expense Copilot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Personal finance tracker
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
              sx={{ px: 1.25, py: 0.9 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: 13 }}
              />
            </ListItemButton>
          )
        })}
      </List>

      <Box
        sx={{
          p: 2,
          borderRadius: 4,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.12,
          )} 100%)`,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
          AI guidance ready
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ask smarter questions about spending, savings, and financial habits.
        </Typography>
      </Box>
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
              p: 1.5,
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
              minHeight: 72,
              px: { xs: 2, md: 3, lg: 4 },
              gap: 2,
              justifyContent: 'space-between',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
              {!isLargeScreen ? (
                <IconButton onClick={handleDrawerToggle} edge="start" aria-label="open navigation">
                  <MenuRoundedIcon />
                </IconButton>
              ) : null}
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="h6" noWrap>
                  {pageTitle}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ flexGrow: 1, justifyContent: 'flex-end' }}
            >
              <TextField
                placeholder="Search expenses"
                size="small"
                sx={{ width: { xs: '100%', sm: 220, md: 280 }, maxWidth: 320, display: { xs: 'none', sm: 'flex' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Chip
                icon={<SmartToyRoundedIcon />}
                label="AI Connected"
                color="success"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  height: 32,
                  '& .MuiChip-icon': { color: 'success.main' },
                  backgroundColor: (muiTheme) => alpha(muiTheme.palette.success.main, 0.12),
                }}
              />
              <IconButton aria-label="notifications">
                <Badge color="error" variant="dot">
                  <NotificationsNoneRoundedIcon />
                </Badge>
              </IconButton>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Avatar sx={{ width: 34, height: 34, bgcolor: 'secondary.main', fontSize: 14 }}>M</Avatar>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography variant="subtitle2">Mohan</Typography>
                </Box>
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
              {navigationItems.slice(0, 5).map((item) => {
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
