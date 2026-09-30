import api from './api.js'

export async function getDashboardData() {
  const { data } = await api.get('/dashboard')
  return data
}
