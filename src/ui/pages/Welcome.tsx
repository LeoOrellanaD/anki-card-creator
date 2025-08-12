import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSettings } from '@/ui/context/SettingsContext'

const Welcome = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { loading } = useSettings()

  if (loading) {
    return <div className='text-center p-4'>{t('loading')}</div>
  }

  return (
    <main className='bg-white text-black dark:bg-gray-900 flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center'>
        {t('welcome')}
      </h1>
      <button
        onClick={() => navigate('/settings', { state: { from: '/welcome' } })}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
      >
        {t('button.config')}
      </button>
    </main>
  )
}

export default Welcome
