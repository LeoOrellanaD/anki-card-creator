import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useSettings = () => {
  const { i18n } = useTranslation()
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
        console.log(savedConfig)
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
        console.log(newConfig)
      }
    } catch (error) {
      console.error('Error saving config:', error)
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
    config,
    loading,
    saveConfiguration,
    handleThemeChange,
    handleLanguageChange,
    handleLanguageToggle,
  }
}
