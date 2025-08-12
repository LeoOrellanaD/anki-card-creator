import { useTranslation } from 'react-i18next'
import { MAIN_LANGUAGES } from '@/ui/data/languages'

type LanguageSelectorProps = {
  title: string
  language: string
  onChange: (language: string) => void
}

const LanguageSelector = ({
  title,
  language,
  onChange,
}: LanguageSelectorProps) => {
  const { t } = useTranslation()
  return (
    <section className='mb-8'>
      <h2 className='text-xl font-semibold text-gray-700 mb-4'>{title}</h2>
      <div className='grid grid-cols-2 gap-3'>
        {MAIN_LANGUAGES.map((lang) => (
          <button
            aria-pressed={language === lang}
            key={lang}
            onClick={() => onChange(lang)}
            className={`px-3 py-2 rounded-lg border transition-all ${
              language === lang
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`languages.${lang}`)}
          </button>
        ))}
      </div>
    </section>
  )
}

export default LanguageSelector
