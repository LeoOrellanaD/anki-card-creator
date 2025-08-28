import fs from 'fs'
import path from 'path'
import { app } from 'electron'

export function log(message: string) {
  const logFile = path.join(app.getPath('userData'), 'kokoro.log')
  const timestamp = new Date().toISOString()
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`)
}
