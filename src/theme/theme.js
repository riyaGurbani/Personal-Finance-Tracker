import { alpha, createTheme } from '@mui/material/styles'

const primaryMain = '#4c6fff'
const secondaryMain = '#7b61ff'
const successMain = '#16a34a'
const backgroundDefault = '#f3f6fc'
const backgroundPaper = '#ffffff'
const textPrimary = '#172554'
const textSecondary = '#64748b'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primaryMain,
      light: '#818cf8',
      dark: '#3730a3',
    },
    secondary: {
      main: secondaryMain,
      light: '#a78bfa',
      dark: '#5b21b6',
    },
    success: {
      main: successMain,
      light: '#4ade80',
      dark: '#15803d',
    },
    background: {
      default: backgroundDefault,
      paper: backgroundPaper,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    divider: '#e5e7eb',
    info: {
      main: '#0ea5e9',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body2: {
      lineHeight: 1.7,
    },
  },
  shadows: [
    'none',
    '0px 8px 24px rgba(76, 111, 255, 0.04)',
    '0px 10px 28px rgba(76, 111, 255, 0.05)',
    '0px 12px 30px rgba(76, 111, 255, 0.06)',
    '0px 14px 32px rgba(76, 111, 255, 0.07)',
    '0px 16px 34px rgba(76, 111, 255, 0.08)',
    '0px 18px 36px rgba(76, 111, 255, 0.09)',
    '0px 20px 38px rgba(76, 111, 255, 0.1)',
    '0px 22px 40px rgba(76, 111, 255, 0.11)',
    '0px 24px 42px rgba(76, 111, 255, 0.12)',
    '0px 26px 44px rgba(76, 111, 255, 0.13)',
    '0px 28px 46px rgba(76, 111, 255, 0.14)',
    '0px 30px 48px rgba(76, 111, 255, 0.15)',
    '0px 32px 50px rgba(76, 111, 255, 0.16)',
    '0px 34px 52px rgba(76, 111, 255, 0.17)',
    '0px 36px 54px rgba(76, 111, 255, 0.18)',
    '0px 38px 56px rgba(76, 111, 255, 0.19)',
    '0px 40px 58px rgba(76, 111, 255, 0.2)',
    '0px 42px 60px rgba(76, 111, 255, 0.21)',
    '0px 44px 62px rgba(76, 111, 255, 0.22)',
    '0px 46px 64px rgba(76, 111, 255, 0.23)',
    '0px 48px 66px rgba(76, 111, 255, 0.24)',
    '0px 50px 68px rgba(76, 111, 255, 0.25)',
    '0px 52px 70px rgba(76, 111, 255, 0.26)',
    '0px 54px 72px rgba(76, 111, 255, 0.27)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: backgroundDefault,
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha(backgroundPaper, 0.94),
          color: textPrimary,
          boxShadow: '0px 10px 30px rgba(76, 111, 255, 0.08)',
          backdropFilter: 'blur(14px)',
          borderBottom: `1px solid ${alpha('#dbe4ff', 0.9)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0px 16px 40px rgba(76, 111, 255, 0.08)',
          border: `1px solid ${alpha('#dbe4ff', 0.95)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: alpha('#f8fbff', 0.95),
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          marginBottom: 6,
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.12),
            color: primaryMain,
            boxShadow: 'inset 0 0 0 1px rgba(76, 111, 255, 0.08)',
            '& .MuiListItemIcon-root': {
              color: primaryMain,
            },
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
})

export default theme
