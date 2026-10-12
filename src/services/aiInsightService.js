import api from './api.js'

export async function getSummaryInsight() {
  const { data } = await api.get('/ai/insights/summary')
  return data
}

export async function getCategoryTrendInsight() {
  const { data } = await api.get('/ai/insights/category-trend')
  return data
}