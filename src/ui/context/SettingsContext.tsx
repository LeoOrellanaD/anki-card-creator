import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { ConfigService } from '@/ui/services/configService'
import { electronConfigService } from '@/ui/services/configService'

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
)

interface SettingsProviderProps {
  children: React.ReactNode
  service?: ConfigService
}

export const SettingsProvider = ({
  children,
  service = electronConfigService,
}: SettingsProviderProps) => {
  const [config, setConfig] = useState<Config>({
    theme: 'light',
    language: '',
    languageList: [],
  })

  const [draftConfig, setDraftConfig] = useState<Config>(config)
  const [loading, setLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const resetDraftConfig = useCallback(() => {
    setDraftConfig(config)
  }, [config])

  const saveConfiguration = async () => {
    await service.saveConfig(draftConfig)
    setConfig(draftConfig)
  }

  const handleThemeChange = (theme: 'light' | 'dark') =>
    setDraftConfig((prev) => ({ ...prev, theme }))

  const handleLanguageChange = (language: string) =>
    setDraftConfig((prev) => ({ ...prev, language }))

  const handleLanguageToggle = (langCode: string) =>
    setDraftConfig((prev) => {
      const isSelected = prev.languageList.includes(langCode)
      const newList = isSelected
        ? prev.languageList.filter((c) => c !== langCode)
        : [...prev.languageList, langCode]
      return { ...prev, languageList: newList }
    })

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await service.getConfig()
        setConfig(savedConfig)
        setDraftConfig(savedConfig)
      } catch (err) {
        console.error('Error loading config:', err)
      } finally {
        setLoading(false)
        setIsLoaded(true)
      }
    }
    loadConfig()
  }, [service])

  return (
    <SettingsContext.Provider
      value={{
        config,
        draftConfig,
        loading,
        isLoaded,
        handleThemeChange,
        handleLanguageChange,
        handleLanguageToggle,
        saveConfiguration,
        resetDraftConfig,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
