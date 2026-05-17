import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { Toaster } from './sonner'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" richColors closeButton />
    </BrowserRouter>
  )
}

export default App