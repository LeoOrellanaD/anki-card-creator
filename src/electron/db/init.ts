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
      FOREIGN KEY(language_id) REFERENCES language(language_id),
      FOREIGN KEY(user_id) REFERENCES users(user_id)
      
    )
  `
  ).run()
}
