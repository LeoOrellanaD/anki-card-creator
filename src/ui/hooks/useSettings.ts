import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useSettings = () => {
  const { i18n } = useTranslation()

  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const [config, setConfig] = useState<Config>({
    theme: 'light',
    language: '',
    languageList: [],
  })

  const [loading, setLoading] = useState(true)

  const loadConfig = async () => {
    try {
      if (window.electron) {
        const savedConfig = await window.electron.getConfig()
        setConfig(savedConfig)
      }
    } catch (error) {
      console.error('Error loading config:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveConfiguration = async (newConfig: Config) => {
    try {
      if (window.electron) {
        await window.electron.saveConfig(newConfig)
        setConfig(newConfig)
        setToast({ message: 'settings_saved', type: 'success' })
      }
    } catch (error) {
      console.error('Error saving config:', error)
      setToast({ message: 'save_error', type: 'error' })
    }
  }

  const handleThemeChange = async (theme: 'light' | 'dark') => {
    const newConfig = { ...config, theme }
    await saveConfiguration(newConfig)
  }

  const handleLanguageChange = async (language: string) => {
    const newConfig = { ...config, language }
    await saveConfiguration(newConfig)
    await i18n.changeLanguage(language)
  }

  const handleLanguageToggle = async (langCode: string) => {
    const isSelected = config.languageList.includes(langCode)
    const newLanguageList = isSelected
      ? config.languageList.filter((code) => code !== langCode)
      : [...config.languageList, langCode]

    const newConfig = { ...config, languageList: newLanguageList }
    await saveConfiguration(newConfig)
  }

  useEffect(() => {
    loadConfig()
  }, [])

  return {
    toast,
    setToast,
    config,
    loading,
    saveConfiguration,
    handleThemeChange,
    handleLanguageChange,
    handleLanguageToggle,
  }
}
