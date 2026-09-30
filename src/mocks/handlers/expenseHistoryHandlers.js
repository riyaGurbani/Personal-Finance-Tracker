import { http, HttpResponse } from 'msw'
import expenseHistoryData from '../data/expense-history.json'

export const expenseHistoryHandlers = [
  http.get('/api/expense-history', () => HttpResponse.json(expenseHistoryData)),
]
