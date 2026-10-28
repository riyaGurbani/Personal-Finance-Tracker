import { NavLink, Outlet } from 'react-router-dom'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Chip,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { navigationItems } from './navigation.js'
import Sidebar from './Sidebar.jsx'
import UserActions from './UserActions.jsx'
import { useLayoutState } from './useLayoutState.js'

const drawerWidth = 280

function AppLayout() {
  const theme = useTheme()
  const {
    pathname,
    pageTitle,
    isLargeScreen,
    isMobile,
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
  } = useLayoutState()

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
          <Sidebar pathname={pathname} onItemClick={handleDrawerClose} />
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
          <Sidebar pathname={pathname} onItemClick={handleDrawerClose} />
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
                    // endAdornment: (
                    //   <Chip label="⌘K" size="small" sx={{ height: 24, borderRadius: 2, bgcolor: 'rgba(148,163,184,0.12)' }} />
                    // ),
                  },
                }}
              />
              <IconButton aria-label="search expenses" sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
                <SearchRoundedIcon />
              </IconButton>
            </Stack>

            <UserActions pageTitle={pageTitle} />
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
              value={pathname}
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
