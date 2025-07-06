import db from '../db/database.js'

const createCard = (card: CreateCardInput): number => {
  try {
    const stmt = db.prepare(
      `INSERT INTO cards (date, language_id, user_id) VALUES (?, ?, ?)`
    )
    const result = stmt.run(card.date, card.language_id, card.user_id)
    return result.lastInsertRowid as number
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getCard = (id: number): Card | undefined => {
  try {
    const stmt = db.prepare(`SELECT * FROM cards WHERE id = ?`)
    return stmt.get(id) as Card | undefined
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getCards = (): Card[] => {
  try {
    const stmt = db.prepare(`SELECT * FROM cards`)
    return stmt.all() as Card[]
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createCard, getCard, getCards }
