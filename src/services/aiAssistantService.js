import api from './api.js'

export async function askAssistant(question) {
  const response = await api.post('/ai-assistant', { question })
  return response.data
}
