import axios from 'axios'

// API client pointing to the Node.js backend
// In development the backend runs on http://localhost:3001
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
