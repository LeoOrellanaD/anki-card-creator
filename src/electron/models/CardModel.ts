import db from '../db/database.js'

const createCard = (card: CreateCardInput): number => {
  try {
    const stmt = db.prepare(
      `INSERT INTO cards (date, language_id, user_id) VALUES (?, ?, ?)`
    )
    const result = stmt.run(card.date, card.language_id, card.user_id)
    return result.lastInsertRowid as number
  } catch (error) {
    throw new Error(`CardModel -> createCard: ${String(error)}`)
  }
}

const getCard = (id: number): Card | undefined => {
  try {
    const stmt = db.prepare(`SELECT * FROM cards WHERE id = ?`)
    return stmt.get(id) as Card | undefined
  } catch (error) {
    throw new Error(`CardModel -> getCard: ${String(error)}`)
  }
}

const getCards = (): Card[] => {
  try {
    const stmt = db.prepare(`SELECT * FROM cards`)
    return stmt.all() as Card[]
  } catch (error) {
    throw new Error(`CardModel -> getCards: ${String(error)}`)
  }
}

const getCardsByLanguage = (languageId: number): Card[] | undefined => {
  try {
    const stmt = db.prepare(`SELECT * FROM cards WHERE language_id = ?`)
    return stmt.all(languageId) as Card[] | undefined
  } catch (error) {
    throw new Error(`CardModel -> getCardsByLanguage: ${String(error)}`)
  }
}

const getCardsByYear = (year: string): Card[] | undefined => {
  try {
    const stmt = db.prepare(
      `SELECT * FROM cards WHERE strftime('%Y', date) = ?`
    )
    return stmt.all(year) as Card[] | undefined
  } catch (error) {
    throw new Error(`CardModel -> getCardsByYear: ${String(error)}`)
  }
}

const getCardsCountByDay = ():
  | { date: string; count: number }[]
  | undefined => {
  try {
    const stmt = db.prepare(`
      SELECT date, count(*) as count FROM cards GROUP BY date `)
    return stmt.all() as { date: string; count: number }[] | undefined
  } catch (error) {
    throw new Error(`CardModel -> getCardsByYear: ${String(error)}`)
  }
}

export {
  createCard,
  getCard,
  getCards,
  getCardsByLanguage,
  getCardsByYear,
  getCardsCountByDay,
}
