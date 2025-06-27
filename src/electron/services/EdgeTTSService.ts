import { EdgeTTS } from 'node-edge-tts'
import { getTempPath, audioToBase64 } from '../utils/ttsHelpers.js'
import { saveAudioFile } from '../utils/audioSaver.js'

import fs from 'fs'

const OUTPUT_FORMAT = 'audio-24khz-96kbitrate-mono-mp3'

export async function handleEdgeTTS(payload: ttsEdge) {
  const { text, voice = 'en-US-AriaNeural', lang = 'en-US' } = payload
  const tempPath = getTempPath('mp3')

  try {
    const tts = new EdgeTTS({ voice, lang, outputFormat: OUTPUT_FORMAT })
    await tts.ttsPromise(text, tempPath)
    const finalPath = saveAudioFile(tempPath, text, 'mp3')
    return await audioToBase64(finalPath, 'audio/mp3')
  } catch (err) {
    console.error('[ERROR edge]', err)
    throw new Error('Error al generar audio Edge')
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath)
  }
}
