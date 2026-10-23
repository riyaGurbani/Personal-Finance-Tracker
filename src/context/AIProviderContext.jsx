import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { getAiProviderStatuses } from '../services/aiAssistantService.js'
import { AIProviderContext } from './aiProviderContextValue.js'

const STORAGE_KEY = 'ai-provider-id'
const DEFAULT_PROVIDER_ID = 'mock'

function getStoredProviderId() {
  if (typeof window === 'undefined') {
    return DEFAULT_PROVIDER_ID
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY)
  return storedValue || DEFAULT_PROVIDER_ID
}

export function AIProviderProvider({ children }) {
  const [selectedProviderId, setSelectedProviderId] = useState(getStoredProviderId)
  const [providerStatuses, setProviderStatuses] = useState([])
  const [snackbarState, setSnackbarState] = useState({ open: false, message: '' })
  const hasFetchedStatusesRef = useRef(false)

  const showError = useCallback((message) => {
    setSnackbarState({ open: true, message })
  }, [])

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }))
  }, [])

  const refreshProviderStatuses = useCallback(async () => {
    try {
      const data = await getAiProviderStatuses()
      const providers = Array.isArray(data?.providers) ? data.providers : []
      setProviderStatuses(providers.length ? providers : [{ id: 'mock', label: 'Mock', available: true }])

      const selectedProvider = providers.find((provider) => provider.id === selectedProviderId)
      if (selectedProvider && !selectedProvider.available) {
        setSelectedProviderId(DEFAULT_PROVIDER_ID)
        window.localStorage.setItem(STORAGE_KEY, DEFAULT_PROVIDER_ID)
        showError(`${selectedProvider.label} is currently unavailable. Switched to Mock.`)
      }
    } catch (error) {
      showError(error?.response?.data?.message || 'Failed to load AI provider availability.')
    }
  }, [selectedProviderId, showError])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, selectedProviderId)
  }, [selectedProviderId])

  useEffect(() => {
    if (hasFetchedStatusesRef.current) {
      return
    }

    hasFetchedStatusesRef.current = true
    Promise.resolve().then(() => {
      refreshProviderStatuses()
    })
  }, [refreshProviderStatuses])

  const selectProvider = useCallback(
    (providerId) => {
      const provider = providerStatuses.find((entry) => entry.id === providerId)

      if (provider && !provider.available) {
        showError(`${provider.label} is currently unavailable.`)
        return false
      }

      setSelectedProviderId(providerId)
      return true
    },
    [providerStatuses, showError],
  )

  const value = useMemo(
    () => ({
      selectedProviderId,
      providerStatuses,
      selectProvider,
      refreshProviderStatuses,
      showError,
    }),
    [providerStatuses, refreshProviderStatuses, selectProvider, selectedProviderId, showError],
  )

  return (
    <AIProviderContext.Provider value={value}>
      {children}
      <Snackbar open={snackbarState.open} autoHideDuration={4000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={closeSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </AIProviderContext.Provider>
  )
}

