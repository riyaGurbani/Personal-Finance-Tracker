export function useSettingsState() {
  return {
    profile: {
      name: 'Mohan',
      email: 'mohan@example.com',
      currency: 'inr',
      monthlyBudget: '₹ 65000',
    },
    currencies: [
      { value: 'inr', label: 'INR (₹)' },
      { value: 'usd', label: 'USD ($)' },
    ],
    aiPreferences: [
      { id: 'ai-categorization', label: 'Enable AI categorization', enabled: true },
      { id: 'spending-insights', label: 'Enable spending insights', enabled: true },
      { id: 'anomaly-detection', label: 'Enable anomaly detection', enabled: true },
      { id: 'budget-predictions', label: 'Enable budget predictions', enabled: true },
      { id: 'proactive-recommendations', label: 'Enable proactive recommendations', enabled: true },
    ],
    privacyMessage: 'Manage your data, privacy settings, and account controls here.',
  }
}