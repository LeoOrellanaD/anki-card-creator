import db from './database.js'

export const initDatabase = () => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL
    )
  `
  ).run()

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS languages (
      language_id INTEGER PRIMARY KEY AUTOINCREMENT,
      code CHAR(2) NOT NULL,
      language_name VARCHAR(50) NOT NULL
    )
  `
  ).run()

  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d', 'now')), 
      language_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY(language_id) REFERENCES languages(language_id),
      FOREIGN KEY(user_id) REFERENCES users(user_id)
      
    )
  `
  ).run()

  // Insert Languages direclty in the table Languages
  const { total } = db
    .prepare(`SELECT COUNT(*) as total FROM languages`)
    .get() as { total: number }

  if (total === 0) {
    const insert = db.prepare(
      `INSERT INTO languages (code, language_name) VALUES (?, ?)`
    )
    const languages = [
      ['en', 'English'],
      ['en-uk', 'English (UK)'],
      ['fr', 'French'],
      ['de', 'German'],
      ['es', 'Spanish'],
    ]
    const insertMany = db.transaction((langs) => {
      for (const lang of langs) insert.run(lang)
    })
    insertMany(languages)
  }
}
