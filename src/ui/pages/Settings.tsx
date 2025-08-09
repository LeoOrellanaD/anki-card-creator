import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSettings } from '@/ui/hooks/useSettings'
import { ThemeSelector } from '@/ui/components/Settings/ThemeSelector'
import { LanguageSelector } from '@/ui/components/Settings/LanguageSelector'
import { AllLanguageSelector } from '@/ui/components/Settings/AllLanguageSelector'
import { Toast } from '@/ui/components/Toast'

export const Settings = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const {
    config,
    loading,
    toast,
    setToast,
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <header>
        <h1 className='text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8'>
          {t('settings')}
        </h1>
      </header>
      <ThemeSelector
        title={t('theme')}
        buttonLight={t('light')}
        buttonDark={t('dark')}
        theme={config.theme}
        onChange={handleThemeChange}
      />
      <LanguageSelector
        title={t('language')}
        language={config.language}
        onChange={handleLanguageChange}
      />
      <AllLanguageSelector
        title={t('select_languages')}
        languageList={config.languageList}
        onChange={handleLanguageToggle}
      />

      <footer className='flex flex-col sm:flex-row gap-4 justify-center'>
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

        <button
          onClick={() => saveConfiguration(config)}
          className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
        >
          {t('save')}
        </button>
      </footer>
    </main>
  )
}

{
  /* TODO: change redirection in the button and create new component for a button */
}
