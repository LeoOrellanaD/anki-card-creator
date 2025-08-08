import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes.tsx'
import '../i18n/i18n.ts'

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}

export default App
