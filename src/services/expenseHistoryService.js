import api from './api.js'

export async function getExpenseHistoryData() {
  const { data } = await api.get('/expense-history')
  return data
}
