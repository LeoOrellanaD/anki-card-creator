const ThemeSelector = ({
  title,
  buttonLight,
  buttonDark,
  theme,
  onChange,
}: {
  title: string
  buttonLight: string
  buttonDark: string
  theme: string
  onChange: (theme: 'light' | 'dark') => void
}) => {
  return (
    <section aria-labelledby='theme-section' className='mb-8'>
      <h2 className='text-xl font-semibold text-gray-700 mb-4'>{title}</h2>
      <div className='flex space-x-4'>
        <button
          aria-pressed={theme === 'light'}
          onClick={() => onChange('light')}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            theme === 'light'
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {buttonLight}
        </button>
        <button
          aria-pressed={theme === 'dark'}
          onClick={() => onChange('dark')}
          className={`px-4 py-2 rounded-lg border-2 transition-all ${
            theme === 'dark'
              ? 'bg-blue-100 border-blue-500 text-blue-700'
              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {buttonDark}
        </button>
      </div>
    </section>
  )
}

export default ThemeSelector
