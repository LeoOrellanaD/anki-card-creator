import { ipcMain, app } from 'electron'
import { KokoroTTS } from 'kokoro-js'
import path from 'path'
import fs from 'fs'
import { saveAudioFile } from '../utils/audioSaver.js'

let ttsInstance: KokoroTTS | null = null
const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'

//load the Kokoro TTS model only once
async function getTTS() {
  if (!ttsInstance) {
    ttsInstance = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'cpu',
    })
  }
  return ttsInstance
}

function getTempPath(): string {
  const unique = Date.now()
  return path.join(app.getPath('userData'), `temp-${unique}.wav`)
}

function encodeFileToBase64(filePath: string): string {
  const buffer = fs.readFileSync(filePath)
  return buffer.toString('base64')
}

ipcMain.handle('generate-audio-kokoro', async (_, payload: ttsKokoro) => {
  const { text, voice } = payload

  try {
    if (!text || text.trim().length === 0) throw new Error('Texto vacío')
    if (text.length > 300) throw new Error('Texto demasiado largo')
    const tts = await getTTS()
    const audio = await tts.generate(text, { voice: voice || 'bf_emma' })
    const tempPath = getTempPath()
    await audio.save(tempPath)
    const finalPath = saveAudioFile(tempPath, text, 'wav')
    const base64 = encodeFileToBase64(finalPath)
    fs.unlinkSync(tempPath)
    return `data:audio/wav;base64,${base64}`
  } catch (error) {
    console.error('[ERROR audio kokoro]', error)
    throw new Error('Error al generar el audio')
  }
})
