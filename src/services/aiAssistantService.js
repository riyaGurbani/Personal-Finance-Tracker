import api from './api.js'

export async function getAiProviderStatuses() {
  const response = await api.get('/ai/providers/status')
  return response.data
}

export async function askAssistant({ provider, message }) {
  const response = await api.post('/ai/chat', { provider, message })
  return response.data
}
