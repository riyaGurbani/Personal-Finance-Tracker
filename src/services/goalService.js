import api from './api.js'

export async function getGoals() {
  const { data } = await api.get('/goals')
  return data.goals
}

export async function createGoal(payload) {
  const { data } = await api.post('/goals', payload)
  return data
}
