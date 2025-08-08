import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'

export const Settings = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [config, setConfig] = useState<Config>({
    theme: 'light',
    language: '',
    languageList: [],
  })

  const [loading, setLoading] = useState(true)
  const from = location.state?.from || '/'
  const mainLanguages = ['en', 'es']
  const allLanguages = [
    'en',
    'es',
    'fr',
    'de',
    'pt',
    'ja',
    'zh',
    'it',
    'ru',
    'ko',
  ]

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      if (window.electron) {
        const savedConfig = await window.electron.getConfig()
        console.log(savedConfig)
        setConfig(savedConfig)
        await i18n.changeLanguage(savedConfig.language)
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

  if (loading) {
    return (
      <main className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='text-xl'>{t('loading')}</div>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 md:p-8'>
        <h1 className='text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8'>
          {t('settings')}
        </h1>

        {/* Sección de Tema */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            {t('theme')}
          </h2>
          <div className='flex space-x-4'>
            <button
              onClick={() => handleThemeChange('light')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                config.theme === 'light'
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('light')}
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                config.theme === 'dark'
                  ? 'bg-blue-100 border-blue-500 text-blue-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('dark')}
            </button>
          </div>
        </div>

        {/* Sección de Idioma Principal (solo español e inglés) */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            {t('language')}
          </h2>
          <div className='grid grid-cols-2 gap-3'>
            {mainLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  config.language === lang
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`languages.${lang}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Sección de Idiomas Seleccionables */}
        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            {t('select_languages')}
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
            {allLanguages.map((langCode) => (
              <button
                key={langCode}
                onClick={() => handleLanguageToggle(langCode)}
                className={`px-3 py-2 rounded-lg border transition-all flex items-center justify-center ${
                  config.languageList.includes(langCode)
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t(`languages.${langCode}`)}
                {config.languageList.includes(langCode) && (
                  <span className='ml-2'>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={() => navigate(from)}
            className='px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            {t('back')}
          </button>

          {from === '/welcome' && (
            <button
              onClick={() => navigate('/')}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              {t('continue')}
            </button>
          )}

          {from !== '/welcome' && (
            <button
              onClick={() => navigate('/')}
              className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              {t('back_to_home')}
            </button>
          )}

          <div className='mb-8 text-center'>
            <button
              onClick={() => saveConfiguration(config)}
              className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
