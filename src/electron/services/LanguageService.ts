import {
  createLanguage,
  getLanguage,
  getLanguages,
} from '../models/LanguageModel.js'

export const createLanguageService = (data: CreateLanguageInput): number => {
  if (!data.code.trim()) throw new Error('code is required')
  if (!data.language_name.trim()) throw new Error('language is required')

  return createLanguage(data)
}

export const getLanguagesService = (): Language[] => {
  return getLanguages()
}

export const getLanguageService = (id: number): Language | undefined => {
  return getLanguage(id)
}
