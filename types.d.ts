interface Window {
  electron: {
    getAudioKokoro: (payload: ttsKokoro) => Promise<string>
    getAudioEdge: (payload: ttsEdge) => Promise<string>
    createUser: (payload: CreateUserInput) => Promise<number>
    getUsers: () => Promise<User[]>
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

interface Card {
  id: number
  date: string
  language_id: number
  user_id: number
}
