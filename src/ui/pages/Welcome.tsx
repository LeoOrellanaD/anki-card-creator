import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Welcome = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const NavigateToSettings = () => {
    console.log(window.electron)
    navigate('/settings')
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center'>
        {t('welcome')}
      </h1>

      <button
        onClick={NavigateToSettings}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
      >
        {t('button.config')}
      </button>
    </main>
  )
}
