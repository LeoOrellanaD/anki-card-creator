import { HashRouter } from 'react-router-dom'
import { SettingsProvider } from '@/ui/context/SettingsContext'
import { AppRoutes } from '@/ui/routes/AppRoutes.tsx'

import '../i18n/i18n.ts'

function App() {
  return (
    <SettingsProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </SettingsProvider>
  )
}

export default App
