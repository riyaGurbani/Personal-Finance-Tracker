export function useAddExpenseState() {
  return {
    paymentMethods: [
      { value: 'upi', label: 'UPI' },
      { value: 'card', label: 'Credit Card' },
      { value: 'cash', label: 'Cash' },
    ],
    categories: [
      { value: 'food', label: 'Food & Dining' },
      { value: 'transport', label: 'Transportation' },
      { value: 'shopping', label: 'Shopping' },
    ],
    aiSuggestion: {
      title: 'AI Suggestion',
      subtitle: 'Suggested category: Food & Dining',
      description:
        'Confidence: 96% · Reason: Swiggy is commonly associated with food delivery transactions.',
    },
  }
}