import { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

const Toast = ({
  message,
  type = 'success',
  duration = 2000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose?.(), 300)
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
      className={`fixed right-4 bottom-4 ${bgColor} transform rounded-lg px-4 py-2 text-white shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center">
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast
