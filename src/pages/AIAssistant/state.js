import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { askAssistant } from '../../services/aiAssistantService.js'

const defaultSuggestions = [
  'How much did I spend on dining this month?',
  'Show unusual expenses from the last 30 days',
  'What can I do to improve my savings rate?',
]

export function useAIAssistantState() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const mutation = useMutation({
    mutationFn: askAssistant,
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: 'assistant', text: data.answer }])
    },
  })

  function sendQuestion(questionOverride) {
    const question = (questionOverride ?? input).trim()
    if (!question) return

    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')
    mutation.mutate(question)
  }

  return {
    suggestedQuestions: defaultSuggestions,
    input,
    setInput,
    messages,
    sendQuestion,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
  }
}
