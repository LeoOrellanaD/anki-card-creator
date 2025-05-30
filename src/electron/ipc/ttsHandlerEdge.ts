import path from 'path'
import fs from 'fs'
import { app, ipcMain } from 'electron'
import { EdgeTTS } from 'node-edge-tts'

ipcMain.handle(
  'generate-audio-edge',
  async (_, text: string, voice?: string, lang?: string) => {
    const tts = new EdgeTTS({
      voice: voice || 'en-US-AriaNeural',
      lang: lang || 'en-US',
      outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    })

    const outputPath = path.join(app.getPath('userData'), 'output-edge.mp3')
    await tts.ttsPromise(text, outputPath)

    // Leer archivo y convertir a base64 para enviar a React
    const buffer = await fs.promises.readFile(outputPath)
    const base64 = buffer.toString('base64')

    return `data:audio/mp3;base64,${base64}`
  }
)
