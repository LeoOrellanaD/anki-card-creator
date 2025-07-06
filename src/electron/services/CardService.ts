import { createCard, getCard, getCards } from '../models/CardModel.js'

export const createCardService = (data: CreateCardInput): number => {
  if (!data.date) throw new Error('date is required')
  if (!data.language_id) throw new Error('language_id is required')
  if (!data.user_id) throw new Error('user_id is required')

  return createCard(data)
}
export const getCardsService = (): Card[] => {
  return getCards()
}
export const getCardService = (id: number): Card | undefined => {
  return getCard(id)
}
