import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

export const Toast = ({
  message,
  type = 'success',
  duration = 2000,
  onClose,
}: ToastProps) => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300) // Espera a que termine la animación
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type]

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      role='alert'
      aria-live='assertive'
    >
      <div className='flex items-center'>
        <span>{t(message)}</span>
      </div>
    </div>
  )
}
