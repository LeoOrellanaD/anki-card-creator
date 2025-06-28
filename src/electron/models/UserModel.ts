import db from '../db/database.js'


const createUser = (user: CreateUserInput): number => {
  try {
    const stmt = db.prepare(`INSERT INTO users (username) VALUES (?)`)
    const result = stmt.run(user.username)
    return result.lastInsertRowid as number
  } catch (err) {
    console.error(err)
    throw err
  }
}

const getUser = (): User[] => {
  try {
    const query = `SELECT * FROM users`
    const readQuery = db.prepare(query)
    const rowList = readQuery.all() as User[]
    return rowList
  } catch (err) {
    console.error(err)
    throw err
  }
}

export { createUser, getUser }
