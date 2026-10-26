// Deprecated: previously returned static AI insights data for frontend demos.
// The AI Insights page now consumes data exclusively from the backend
// via aiInsightService.js (getAllInsights / refreshAllInsights).
// This file is kept as a placeholder to avoid breaking imports.

export function getAIInsightsData() {
  return {
    tabs: [],
    activeTab: 'Overview',
    insights: [],
  }
}
