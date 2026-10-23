import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { askAssistant } from '../../services/aiAssistantService.js'
import { useAIProvider } from '../../context/useAIProvider.js'

const defaultSuggestions = [
  'How much did I spend on dining this month?',
  'Show unusual expenses from the last 30 days',
  'What can I do to improve my savings rate?',
]

export function useAIAssistantState() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const { selectedProviderId, showError } = useAIProvider()

  const mutation = useMutation({
    mutationFn: askAssistant,
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer,
          provider: data.provider || selectedProviderId,
          source: data.source || 'mock',
        },
      ])
    },
    onError: (error) => {
      showError(error?.response?.data?.message || 'Failed to get AI response.')
    },
  })

  function sendQuestion(questionOverride) {
    const question = (questionOverride ?? input).trim()
    if (!question) return

    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')
    mutation.mutate({ provider: selectedProviderId, message: question })
  }

  return {
    suggestedQuestions: defaultSuggestions,
    input,
    setInput,
    messages,
    sendQuestion,
    selectedProviderId,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  }
}
