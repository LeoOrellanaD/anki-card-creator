import { KokoroTTS } from 'kokoro-js'
import {
  getTempPath,
  audioToBase64,
  validateText,
} from '../utils/ttsHelpers.js'
import { saveAudioFile } from '../utils/audioSaver.js'
import fs from 'fs'

const MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX'
let ttsInstance: KokoroTTS | null = null

async function getTTS(): Promise<KokoroTTS> {
  if (!ttsInstance) {
    ttsInstance = await KokoroTTS.from_pretrained(MODEL_ID, {
      dtype: 'q8',
      device: 'cpu',
    })
  }
  return ttsInstance
}

export async function handleKokoroTTS(payload: ttsKokoro) {
  const { text, voice } = payload
  validateText(text)

  const tempPath = getTempPath('wav')

  try {
    const tts = await getTTS()
    const audio = await tts.generate(text, { voice })
    await audio.save(tempPath)
    const finalPath = saveAudioFile(tempPath, text, 'wav')
    return await audioToBase64(finalPath, 'audio/wav')
  } catch (error) {
    console.error('[ERROR kokoro]', error)
    throw new Error('Error al generar audio Kokoro')
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
  }
}
