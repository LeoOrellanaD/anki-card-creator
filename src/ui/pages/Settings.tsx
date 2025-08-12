import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSettings } from '@/ui/context/SettingsContext'

import ThemeSelector from '@/ui/components/Settings/ThemeSelector'
import LanguageSelector from '@/ui/components/Settings/LanguageSelector'
import AllLanguageSelector from '@/ui/components/Settings/AllLanguageSelector'
import Toast from '@/ui/components/Toast'

const Settings = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const {
    draftConfig,
    loading,
    handleThemeChange,
    handleLanguageChange,
    handleLanguageToggle,
    saveConfiguration,
  } = useSettings()

  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  const handleSave = async () => {
    try {
      await saveConfiguration()
      setToast({ message: 'settings.saved', type: 'success' })
    } catch (error) {
      setToast({ message: 'settings.save_error', type: 'error' })
      console.log(error)
    }
  }

  if (loading) {
    return (
      <main className='flex items-center justify-center min-h-screen'>
        <p>{t('loading')}</p>
      </main>
    )
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <header>
        <h1 className='text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-8'>
          {t('settings')}
        </h1>
      </header>

      <div className='bg-white text-black dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-6'>
        <ThemeSelector
          title={t('theme')}
          buttonLight={t('light')}
          buttonDark={t('dark')}
          theme={draftConfig.theme}
          onChange={handleThemeChange}
        />

        <LanguageSelector
          title={t('language')}
          language={draftConfig.language}
          onChange={handleLanguageChange}
        />

        <AllLanguageSelector
          title={t('select_languages')}
          languageList={draftConfig.languageList}
          onChange={handleLanguageToggle}
        />
      </div>

      <footer className='flex flex-col sm:flex-row gap-4 justify-center mt-8'>
        {from === '/welcome' ? (
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            {t('continue')}
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
          >
            {t('back_to_home')}
          </button>
        )}

        <button
          onClick={handleSave}
          className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
        >
          {t('save')}
        </button>
      </footer>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  )
}

export default Settings
