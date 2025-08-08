import { useSettings } from '../hooks/useSettings'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ALL_LANGUAGES, MAIN_LANGUAGES } from '../data/languages'

export const Settings = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const {
    config,
    loading,
    handleThemeChange,
    handleLanguageChange,
    handleLanguageToggle,
    saveConfiguration,
  } = useSettings()

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

        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            {t('language')}
          </h2>
          <div className='grid grid-cols-2 gap-3'>
            {MAIN_LANGUAGES.map((lang) => (
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

        <div className='mb-8'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            {t('select_languages')}
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
            {ALL_LANGUAGES.map((langCode) => (
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
