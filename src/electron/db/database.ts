import Database from 'better-sqlite3'
import path from 'path'
import { isDev } from '../utils.js'
import { app } from 'electron'

//Route where the database will be create
const dbPath = isDev()
  ? './app.db'
  : path.join(app.getPath('userData'), 'app.db')
const db = new Database(dbPath)

export default db
