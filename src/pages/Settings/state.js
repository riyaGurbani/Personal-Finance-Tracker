import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile } from '../../services/profileService.js'

export function useSettingsState() {
  const queryClient = useQueryClient()

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data)
    },
  })

  const currencies = [
    { value: 'inr', label: 'INR (₹)' },
    { value: 'usd', label: 'USD ($)' },
  ]

  const aiPreferences = [
    { id: 'ai-categorization', label: 'Enable AI categorization', enabled: true },
    { id: 'spending-insights', label: 'Enable spending insights', enabled: true },
    { id: 'anomaly-detection', label: 'Enable anomaly detection', enabled: true },
    { id: 'budget-predictions', label: 'Enable budget predictions', enabled: true },
    { id: 'proactive-recommendations', label: 'Enable proactive recommendations', enabled: true },
  ]

  const privacyMessage = 'Manage your data, privacy settings, and account controls here.'

  return {
    profile: profileQuery.data || null,
    currencies,
    aiPreferences,
    privacyMessage,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  }
}