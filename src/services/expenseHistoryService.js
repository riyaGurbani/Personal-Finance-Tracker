import api from './api.js'

export async function getExpenseHistoryData() {
  const { data } = await api.get('/expenses', {
    params: {
      limit: 20,
      sortBy: 'date',
      order: 'desc',
    },
  })

  const transactions = data.items.map((item) => ({
    id: item.id,
    date: new Date(item.date).toLocaleDateString('en-IN'),
    merchant: item.merchant,
    category: item.category,
    paymentMethod: item.paymentMethod || '—',
    amount: `₹${Number(item.amount).toFixed(2)}`,
    aiStatus: item.isAiCategorized ? 'AI categorized' : 'Manual',
  }))

  const totalAmount = data.items.reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const aiCategorizedCount = data.items.filter((item) => item.isAiCategorized).length

  return {
    filters: {
      search: '',
      category: '',
      paymentMethod: '',
      minAmount: '',
      maxAmount: '',
    },
    stats: [
      { label: 'Transactions', value: String(data.pagination.total) },
      { label: 'Visible Spend', value: `₹${totalAmount.toFixed(2)}` },
      { label: 'AI Categorized', value: String(aiCategorizedCount) },
    ],
    transactions,
  }
}
