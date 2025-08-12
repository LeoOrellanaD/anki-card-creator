// === INTERFACES GLOBALES ===
interface Window {
  electron: {
    getAudioEdge: (payload: ttsEdge) => Promise<string>
    createUser: (payload: CreateUserInput) => Promise<number>
    getUsers: () => Promise<User[]>
    createLanguage: (payload: CreateLanguageInput) => Promise<number>
    getLanguage: (id: number) => Promise<Language | undefined>
    getLanguages: () => Promise<Language[]>
    createCard: (payload: CreateCardInput) => Promise<number>
    getCard: (id: number) => Promise<Card | undefined>
    getCards: () => Promise<Card[]>
    getConfig: () => Promise<Config>
    saveConfig: (payload: Config) => Promise<{ success: boolean }>
  }
}

// === TIPOS PARA TTS ===
type ttsEdge = {
  text: string
  voice: string
  lang: string
}

type VoiceOption = {
  label: string
  voice: string
}

type VoiceMap = {
  [lang: string]: VoiceOption[]
}

// === TIPOS PARA USUARIOS ===
interface User {
  user_id: number
  username: string
}

type CreateUserInput = Omit<User, 'user_id'>

// === TIPOS PARA LENGUAJES ===
interface Language {
  language_id: number
  code: string
  language_name: string
}

type CreateLanguageInput = Omit<Language, 'language_id'>

// === TIPOS PARA TARJETAS ===
interface Card {
  id: number
  date: string
  language_id: number
  user_id: number
}

type CreateCardInput = Omit<Card, 'id'>

// === TIPOS PARA CONFIGURACIÓN ===
interface Config {
  theme: 'light' | 'dark'
  language: string
  languageList: string[]
}

// === MAPEO DE EVENTOS ===
type EventPayloadMapping = {
  generateAudioEdge: [ttsEdge, string] // [INPUT, OUTPUT]
  createUser: [CreateUserInput, number]
  getUsers: [undefined, User[]]
  createLanguage: [CreateLanguageInput, number]
  getLanguage: [number, Language | undefined]
  getLanguages: [undefined, Language[]]
  createCard: [CreateCardInput, number]
  getCard: [number, Card | undefined]
  getCards: [undefined, Card[]]
  saveConfig: [Config, { success: boolean }]
  getConfig: [undefined, Config]
  createDeck: [string, boolean] // o any si no te interesa el retorno exacto
  addCard: [AddCardPayload]
}

// === TIPOS PARA ANKI ===

type CardPayload = {
  deckName: string
  front: string
  back: string
  audioPath?: string
  audioFilename?: string
}

interface AnkiRequest {
  action: string
  version: number
  params?: Record<string, unknown>
}

interface AnkiAudio {
  path: string
  filename: string
  fields: string[]
}

interface AnkiCard {
  deckName: string
  modelName: string
  fields: {
    Front: string
    Back: string
  }
  options: {
    allowsDuplicate: boolean
  }
  tags?: string[]
  audio?: AnkiAudio
}

type ToastProps = {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

type ToastType = { message: string; type: 'success' | 'error' } | null

type SettingsContextType = {
  config: Config
  draftConfig: Config
  loading: boolean
  handleThemeChange: (theme: 'light' | 'dark') => void
  handleLanguageChange: (lang: string) => void
  handleLanguageToggle: (langCode: string) => void
  saveConfiguration: () => Promise<void>
}
