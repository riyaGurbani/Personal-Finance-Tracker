export function getAIInsightsData() {
  return {
    tabs: ['Overview', 'Savings', 'Alerts'],
    activeTab: 'Overview',
    insights: [
      {
        id: 'top-category',
        title: 'Top spending category',
        subtitle: 'Groceries is leading this period',
        impact: 'Groceries currently contributes the highest share of your recorded expenses.',
        tone: 'info',
      },
      {
        id: 'ai-categorized',
        title: 'AI categorization coverage',
        subtitle: 'Track how many expenses were auto-tagged',
        impact: 'Use AI categorization to reduce manual tagging effort for repeated merchants.',
        tone: 'warning',
      },
    ],
  }
}
