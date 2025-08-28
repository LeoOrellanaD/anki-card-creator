import db from '../db/database.js'

const createLanguage = (lang: CreateLanguageInput): number => {
  try {
    const stmt = db.prepare(
      `INSERT INTO languages (code, language_name) VALUES (?, ?)`
    )
    const result = stmt.run(lang.code, lang.language_name)
    return result.lastInsertRowid as number
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getLanguage = (id: number): Language | undefined => {
  try {
    const stmt = db.prepare(`SELECT * FROM languages WHERE language_id = ?`)
    return stmt.get(id) as Language | undefined
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getLanguages = (): Language[] => {
  try {
    const stmt = db.prepare(`SELECT * FROM languages`)
    return stmt.all() as Language[]
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { createLanguage, getLanguage, getLanguages }
