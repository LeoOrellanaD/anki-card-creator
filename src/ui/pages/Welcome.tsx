import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSettings } from '@/ui/context/SettingsContext'

const Welcome = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { loading } = useSettings()

  if (loading) {
    return <div className="p-4 text-center">{t('loading')}</div>
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-black dark:bg-gray-900">
      <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
        {t('welcomePage.title')}
      </h1>
      <button
        onClick={() => navigate('/settings', { state: { from: '/welcome' } })}
        className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        {t('welcomePage.button.config')}
      </button>
    </main>
  )
}

export default Welcome
