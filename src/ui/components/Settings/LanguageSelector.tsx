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
  const { t } = useTranslation('langselector')
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {MAIN_LANGUAGES.map((lang) => (
          <button
            aria-pressed={language === lang}
            key={lang}
            onClick={() => onChange(lang)}
            className={`rounded-lg border px-3 py-2 transition-all ${
              language === lang
                ? 'border-blue-500 bg-blue-100 text-blue-700'
                : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`system_languages.${lang}`)}
          </button>
        ))}
      </div>
    </section>
  )
}

export default LanguageSelector
