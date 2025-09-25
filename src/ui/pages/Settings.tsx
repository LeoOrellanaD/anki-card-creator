import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSettings } from '@/ui/context/SettingsContext'

import ThemeSelector from '@/ui/components/Settings/ThemeSelector'
import LanguageSelector from '@/ui/components/Settings/LanguageSelector'
import AllLanguageSelector from '@/ui/components/Settings/AllLanguageSelector'
import Toast from '@/ui/components/Toast'

const Settings = () => {
  const { t } = useTranslation('settings')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const {
    loading,
    draftConfig,
    saveConfiguration,
    handleThemeChange,
    handleLanguageChange,
    handleLanguageToggle,
    resetDraftConfig,
  } = useSettings()

  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  useEffect(() => {
    resetDraftConfig()
  }, [])

  const handleSave = async () => {
    try {
      await saveConfiguration()
      setToast({ message: t('toast_save'), type: 'success' })
    } catch (error) {
      setToast({ message: t('toast_save_error'), type: 'error' })
      console.log(error)
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>{t('loading')}</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <header>
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
          {t('title')}
        </h1>
      </header>

      <div className="w-full max-w-2xl space-y-6 rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-900 dark:text-white">
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

      <footer className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={() => navigate(from === '/welcome' ? '/' : from)}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-colors duration-200 hover:bg-blue-700 hover:shadow-lg"
        >
          {from === '/welcome' ? t('continue') : t('back_to_home')}
        </button>

        <button
          onClick={handleSave}
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-colors duration-200 hover:bg-green-700 hover:shadow-lg"
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
