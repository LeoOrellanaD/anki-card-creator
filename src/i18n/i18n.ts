import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import settingsEN from './locales/en/settings.json'
import welcomeEN from './locales/en/welcome.json'
import languageSelectorEN from './locales/en/languageSelector.json'

import settingsES from './locales/es/settings.json'
import welcomeES from './locales/es/welcome.json'
import languageSelectorES from './locales/es/languageSelector.json'

const resources = {
  es: {
    welcome: welcomeES,
    settings: settingsES,
    langselector: languageSelectorES,
  },
  en: {
    welcome: welcomeEN,
    settings: settingsEN,
    langselector: languageSelectorEN,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
