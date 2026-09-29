import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

export const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: DashboardRoundedIcon,
    title: 'Dashboard',
  },
  {
    label: 'Add Expense',
    path: '/expenses/add',
    icon: AddCircleOutlineRoundedIcon,
    title: 'Add Expense',
  },
  {
    label: 'Expense History',
    path: '/expenses',
    icon: ReceiptLongRoundedIcon,
    title: 'Expense History',
  },
  {
    label: 'AI Assistant',
    path: '/ai-assistant',
    icon: SmartToyRoundedIcon,
    title: 'AI Assistant',
  },
  {
    label: 'AI Insights',
    path: '/ai-insights',
    icon: InsightsRoundedIcon,
    title: 'AI Insights',
  },
  {
    label: 'Knowledge Center',
    path: '/knowledge-center',
    icon: MenuBookRoundedIcon,
    title: 'Knowledge Center',
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: SettingsRoundedIcon,
    title: 'Settings',
  },
]

export function getPageTitle(pathname) {
  const matchedItem = navigationItems.find((item) => pathname.startsWith(item.path))
  return matchedItem?.title || 'AI Expense Copilot'
}
