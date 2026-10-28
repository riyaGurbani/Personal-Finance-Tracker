import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { getPageTitle } from './navigation.js'

export function useLayoutState() {
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

  return {
    location,
    pathname: location.pathname,
    pageTitle,
    isLargeScreen,
    isMobile,
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
  }
}
