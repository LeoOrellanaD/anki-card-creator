interface Window {
  electron: {
    getAudioKokoro: (payload: ttsKokoro) => Promise<string>
    getAudioEdge: (payload: ttsEdge) => Promise<string>
    createUser: (payload: CreateUserInput) => Promise<number>
    getUsers: () => Promise<User[]>
    createLanguage: (payload: CreateLanguageInput) => Promise<number>
    getLanguage: (id: number) => Promise<Language | undefined>
    getLanguages: () => Promise<Language[]>
    createCard: (payload: CreateCardInput) => Promise<number>
    getCard: (id: number) => Promise<Card | undefined>
    getCards: () => Promise<Card[]>
  }
}

type ttsEdge = {
  text: string
  voice: string
  lang: string
}

type ttsKokoro = {
  text: string
  voice: voice
}

type VoiceOption = {
  label: string
  voice: string
}

type VoiceMap = {
  [lang: string]: VoiceOption[]
}

type EventPayloadMapping = {
  generateAudioEdge: [ttsEdge, string] // [INPUT, OUTPUT]
  generateAudioKokoro: [ttsKokoro, string]
  createUser: [CreateUserInput, number]
  getUsers: [undefined, User[]]
  createLanguage: [CreateLanguageInput, number]
  getLanguage: [number, Language | undefined]
  getLanguages: [undefined, Language[]]
  createCard: [CreateCardInput, number]
  getCard: [number, Card | undefined]
  getCards: [undefined, Card[]]
  saveConfig: [Config, undefined]
  getConfig: [undefined, Config | undefined]
}

interface User {
  user_id: number
  username: string
}

type CreateUserInput = Omit<User, 'user_id'>

interface Language {
  language_id: number
  code: string
  language_name: string
}

type CreateLanguageInput = Omit<Language, 'language_id'>

interface Card {
  id: number
  date: string
  language_id: number
  user_id: number
}

type CreateCardInput = Omit<Card, 'id'>

interface Config {
  theme: string
  language: string
  languageList: string[]
}
