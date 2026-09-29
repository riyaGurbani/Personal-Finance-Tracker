import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import DashboardPage from '../pages/Dashboard/DashboardPage.jsx'
import AddExpensePage from '../pages/AddExpense/AddExpensePage.jsx'
import ExpenseHistoryPage from '../pages/ExpenseHistory/ExpenseHistoryPage.jsx'
import AIAssistantPage from '../pages/AIAssistant/AIAssistantPage.jsx'
import AIInsightsPage from '../pages/AIInsights/AIInsightsPage.jsx'
import KnowledgeCenterPage from '../pages/KnowledgeCenter/KnowledgeCenterPage.jsx'
import SettingsPage from '../pages/Settings/SettingsPage.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/expenses/add" element={<AddExpensePage />} />
        <Route path="/expenses" element={<ExpenseHistoryPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/ai-insights" element={<AIInsightsPage />} />
        <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes
