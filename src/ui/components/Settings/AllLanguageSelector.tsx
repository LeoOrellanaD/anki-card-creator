import { ALL_LANGUAGES } from '@/ui/data/languages'
import { useTranslation } from 'react-i18next'

type AllLanguageSelectorProps = {
  title: string
  languageList: string[]
  onChange: (language: string) => void
}

const AllLanguageSelector = ({
  title,
  languageList,
  onChange,
}: AllLanguageSelectorProps) => {
  const { t } = useTranslation()
  return (
    <section className='mb-8'>
      <h2 className='text-xl font-semibold text-gray-700 mb-4'>{title}</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {ALL_LANGUAGES.map((langCode) => (
          <button
            key={langCode}
            onClick={() => onChange(langCode)}
            className={`px-3 py-2 rounded-lg border transition-all flex items-center justify-center ${
              languageList.includes(langCode)
                ? 'bg-green-100 border-green-500 text-green-700'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t(`languages.${langCode}`)}
            {languageList.includes(langCode) && <span className='ml-2'>✓</span>}
          </button>
        ))}
      </div>
    </section>
  )
}

export default AllLanguageSelector
