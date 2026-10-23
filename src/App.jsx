import AppRoutes from './routes/AppRoutes.jsx'
import { AIProviderProvider } from './context/AIProviderContext.jsx'

function App() {
  return (
    <AIProviderProvider>
      <AppRoutes />
    </AIProviderProvider>
  )
}

export default App
