import { http, HttpResponse } from 'msw'
import aiInsightsData from '../data/ai-insights.json'

export const aiInsightsHandlers = [
  http.get('/api/ai-insights', () => HttpResponse.json(aiInsightsData)),
]
