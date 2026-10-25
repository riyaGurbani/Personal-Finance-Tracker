import api from './api.js'

export async function getAiProviderStatuses() {
  const response = await api.get('/ai/providers/status')
  return response.data
}

export async function askAssistant({ provider, message, userId = 'riya-demo' }) {
  const response = await api.post('/ai/assistant', { provider, message, userId })
  return response.data
}
