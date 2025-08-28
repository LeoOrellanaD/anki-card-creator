import { useEffect } from 'react'
import { useSettings } from '../context/SettingsContext'

export function useApplyTheme() {
  const { config } = useSettings()

  useEffect(() => {
    if (config.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [config.theme])
}
