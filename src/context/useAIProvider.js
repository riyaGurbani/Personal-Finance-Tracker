import { useContext } from 'react'
import { AIProviderContext } from './aiProviderContextValue.js'

export function useAIProvider() {
  const context = useContext(AIProviderContext)

  if (!context) {
    throw new Error('useAIProvider must be used within AIProviderProvider')
  }

  return context
}
