import path from 'path'
import fs from 'fs'
import { app } from 'electron'

export function getTempPath(ext: string): string {
  return path.join(app.getPath('userData'), `temp-${Date.now()}.${ext}`)
}

export async function audioToBase64(
  filePath: string,
  mime: string
): Promise<string> {
  const buffer = await fs.promises.readFile(filePath)
  return `data:${mime};base64,${buffer.toString('base64')}`
}

export function validateText(text: string) {
  if (!text || text.trim().length === 0) throw new Error('Texto vacío')
  if (text.length > 300) throw new Error('Texto demasiado largo')
}
