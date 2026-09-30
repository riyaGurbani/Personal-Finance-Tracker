import { dashboardHandlers } from './dashboardHandlers.js'
import { expenseHistoryHandlers } from './expenseHistoryHandlers.js'
import { aiInsightsHandlers } from './aiInsightsHandlers.js'

export const handlers = [
  ...dashboardHandlers,
  ...expenseHistoryHandlers,
  ...aiInsightsHandlers,
]
