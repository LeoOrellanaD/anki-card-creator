// src/ui/context/SettingsContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

interface SettingsProviderProps {
  children: React.ReactNode
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { i18n } = useTranslation()
  const [config, setConfig] = useState<Config>({
    theme: 'light',
    language: '',
    languageList: [],
  })

  const [draftConfig, setDraftConfig] = useState<Config>(config)
  const [loading, setLoading] = useState(true)

  const loadConfig = async () => {
    try {
      if (window.electron) {
        const savedConfig = await window.electron.getConfig()
        console.log('Configuration loaded', savedConfig)

        if (savedConfig.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        if (savedConfig.language) {
          await i18n.changeLanguage(savedConfig.language)
        }

        setConfig(savedConfig)
        setDraftConfig(savedConfig)
      }
    } catch (error) {
      console.error('Error loading config:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveConfiguration = async () => {
    try {
      if (window.electron) {
        await window.electron.saveConfig(draftConfig)
        setConfig(draftConfig)

        // Aplicar cambios a la UI
        if (draftConfig.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        if (draftConfig.language) {
          await i18n.changeLanguage(draftConfig.language)
        }
      }
    } catch (error) {
      console.error('Error saving config:', error)
    }
  }

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setDraftConfig((prev) => ({ ...prev, theme }))
  }

  const handleLanguageChange = (language: string) => {
    setDraftConfig((prev) => ({ ...prev, language }))
  }

  const handleLanguageToggle = (langCode: string) => {
    setDraftConfig((prev) => {
      const isSelected = prev.languageList.includes(langCode)
      const newList = isSelected
        ? prev.languageList.filter((c) => c !== langCode)
        : [...prev.languageList, langCode]
      return { ...prev, languageList: newList }
    })
  }

  useEffect(() => {
    loadConfig()
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        config,
        draftConfig,
        loading,
        handleThemeChange,
        handleLanguageChange,
        handleLanguageToggle,
        saveConfiguration,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error('useSettings must be used within SettingsProvider')
  return context
}
