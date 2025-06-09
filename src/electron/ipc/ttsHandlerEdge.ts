import path from 'path'
import fs from 'fs'
import { app, ipcMain } from 'electron'
import { EdgeTTS } from 'node-edge-tts'
import { saveAudioFile } from '../utils/audioSaver.js'

const OUTPUT_FORMAT = 'audio-24khz-96kbitrate-mono-mp3'

function getTempPath(): string {
  return path.join(app.getPath('userData'), 'temp-edge.mp3')
}

ipcMain.handle('generate-audio-edge', async (_, payload: ttsEdge) => {
  const { text, voice, lang } = payload

  const tts = new EdgeTTS({
    voice: voice || 'en-US-AriaNeural',
    lang: lang || 'en-US',
    outputFormat: OUTPUT_FORMAT,
  })

  const tempPath = getTempPath()
  await tts.ttsPromise(text, tempPath)

  const finalPath = saveAudioFile(tempPath, text, 'mp3')

  const buffer = await fs.promises.readFile(finalPath)
  const base64 = buffer.toString('base64')

  return `data:audio/mp3;base64,${base64}`
})
