import api from './api.js'

export async function getAllInsights() {
  const { data } = await api.get('/ai/insights')
  return data
}

export async function refreshAllInsights() {
  const { data } = await api.post('/ai/insights/refresh')
  return data
}

export async function getSummaryInsight() {
  const { data } = await api.get('/ai/insights/summary')
  return data
}

export async function getCategoryTrendInsight() {
  const { data } = await api.get('/ai/insights/category-trend')
  return data
}

export async function getAnomalyInsight() {
  const { data } = await api.get('/ai/insights/anomaly')
  return data
}

export async function getSavingsOpportunityInsight() {
  const { data } = await api.get('/ai/insights/savings-opportunity')
  return data
}