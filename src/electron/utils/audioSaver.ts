import path from 'path'
import fs from 'fs'
import { app } from 'electron'

export function saveAudioFile(
  tempPath: string,
  text: string,
  ext: 'mp3' | 'wav'
): string {
  const audioDir = path.join(app.getPath('documents'), 'audios')

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true })
  }

  const files = fs.readdirSync(audioDir)
  const indexes = files
    .map((f) => parseInt(f.split('_')[0])) 
    .filter((n) => !isNaN(n))

  const index = indexes.length > 0 ? Math.max(...indexes) + 1 : 1
  const safeText = text
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase()
    .slice(0, 20)
  const finalPath = path.join(audioDir, `${index}_${safeText}.${ext}`)

  fs.copyFileSync(tempPath, finalPath)
  return finalPath
}
