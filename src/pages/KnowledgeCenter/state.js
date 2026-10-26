import { useQuery } from '@tanstack/react-query'
import { getKnowledgeArticles } from '../../services/knowledgeService.js'

export function useKnowledgeCenterState() {
  const articlesQuery = useQuery({
    queryKey: ['knowledge-articles'],
    queryFn: () => getKnowledgeArticles(),
  })

  const introItem = {
    id: 'intro',
    text: 'The AI assistant retrieves relevant information from these documents before generating financial recommendations.',
    isIntro: true,
  }

  const knowledgeItems = [
    introItem,
    ...(articlesQuery.data || []).map((article) => ({
      id: article.slug,
      text: article.title,
      isIntro: false,
    })),
  ]

  return {
    knowledgeItems,
    isLoading: articlesQuery.isLoading,
    isError: articlesQuery.isError,
  }
}