import api from './api.js'

export async function getKnowledgeArticles(query) {
  if (query && query.trim()) {
    const { data } = await api.get('/knowledge/search', { params: { q: query.trim() } })
    return data.articles
  }

  const { data } = await api.get('/knowledge')
  return data.articles
}
