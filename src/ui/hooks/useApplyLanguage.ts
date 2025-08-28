import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../context/SettingsContext'

export function useApplyLanguage() {
  const { config } = useSettings()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (config.language) {
      i18n.changeLanguage(config.language)
    }
  }, [config.language, i18n])
}
