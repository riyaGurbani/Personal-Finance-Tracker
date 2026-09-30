import api from './api.js'

export async function getAIInsightsData() {
  const { data } = await api.get('/ai-insights')
  return data
}
