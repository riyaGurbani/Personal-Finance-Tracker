export function useKnowledgeCenterState() {
  return {
    knowledgeItems: [
      {
        id: 'intro',
        text: 'The AI assistant retrieves relevant information from these documents before generating financial recommendations.',
        isIntro: true,
      },
      { id: 'budgeting-guide', text: 'Monthly Budgeting Guide', isIntro: false },
      { id: 'emergency-fund', text: 'Emergency Fund Basics', isIntro: false },
      { id: 'reduce-expenses', text: 'Reducing Unnecessary Expenses', isIntro: false },
      { id: 'rule-503020', text: 'Understanding the 50/30/20 Rule', isIntro: false },
      { id: 'savings-strategies', text: 'Personal Savings Strategies', isIntro: false },
      { id: 'credit-card', text: 'Credit Card Management', isIntro: false },
    ],
  }
}