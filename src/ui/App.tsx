import { HashRouter } from 'react-router-dom'
import { SettingsProvider } from '@/ui/context/SettingsContext'
import { AppRoutes } from '@/ui/routes/AppRoutes.tsx'

// hooks que aplican efectos de UI
import { useApplyTheme } from '@/ui/hooks/useApplyTheme'
import { useApplyLanguage } from '@/ui/hooks/useApplyLanguage'

import '../i18n/i18n.ts'

function AppContent() {
  useApplyTheme()
  useApplyLanguage()

  return <AppRoutes />
}

function App() {
  return (
    <SettingsProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </SettingsProvider>
  )
}

export default App
