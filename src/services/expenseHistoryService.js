import api from './api.js'

export async function getExpenseHistoryData(filters = {}) {
  const params = {
    page: filters.page || 1,
    limit: filters.limit || 10,
    sortBy: filters.sortBy || 'date',
    order: filters.order || 'desc',
  }

  if (filters.search) {
    params.search = filters.search
  }

  if (filters.category) {
    params.category = filters.category
  }

  if (filters.paymentMethod) {
    params.paymentMethod = filters.paymentMethod
  }

  if (filters.minAmount) {
    params.minAmount = filters.minAmount
  }

  if (filters.maxAmount) {
    params.maxAmount = filters.maxAmount
  }

  const { data } = await api.get('/expenses', {
    params,
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
      search: filters.search || '',
      category: filters.category || '',
      paymentMethod: filters.paymentMethod || '',
      minAmount: filters.minAmount || '',
      maxAmount: filters.maxAmount || '',
      sortBy: params.sortBy,
      order: params.order,
    },
    stats: [
      { label: 'Transactions', value: String(data.pagination.total) },
      { label: 'Visible Spend', value: `₹${totalAmount.toFixed(2)}` },
      { label: 'AI Categorized', value: String(aiCategorizedCount) },
    ],
    transactions,
    pagination: data.pagination,
  }
}
