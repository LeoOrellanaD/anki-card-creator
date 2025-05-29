import { ipcMain, app } from 'electron'
import { KokoroTTS } from 'kokoro-js'
import path from 'path'
import fs from 'fs'

ipcMain.handle('generate-audio', async (_, text) => {
  const model_id = 'onnx-community/Kokoro-82M-v1.0-ONNX'
  const tts = await KokoroTTS.from_pretrained(model_id, {
    dtype: 'q8',
    device: 'cpu',
  })

  const audio = await tts.generate(text, { voice: 'af_heart' })
  const outputPath = path.join(app.getPath('userData'), 'output.wav')
  await audio.save(outputPath)

  // Convertir a base64
  const buffer = fs.readFileSync(outputPath)
  const base64 = buffer.toString('base64')

  return `data:audio/wav;base64,${base64}`
})
