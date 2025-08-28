import fs from 'fs'
import path from 'path'
import { app } from 'electron'

export function cleanAudioDir() {
  const audioDir = path.join(app.getPath('userData'), 'audios')
  if (!fs.existsSync(audioDir)) return

  for (const file of fs.readdirSync(audioDir)) {
    const filePath = path.join(audioDir, file)
    try {
      fs.unlinkSync(filePath)
    } catch (err) {
      console.error(`Error al eliminar ${filePath}:`, err)
    }
  }
}
