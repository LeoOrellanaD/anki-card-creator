import { useState } from 'react'
import voices from './data/voices'

function App() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [ttsEngine, setTtsEngine] = useState<'kokoro' | 'edge'>('kokoro')
  const [voice, setVoice] = useState(voices[0].voice)
  const [lang, setLang] = useState(voices[0].lang)

  const handleGenerate = async () => {
    if (ttsEngine === 'kokoro') {
      const base64Audio = await window.electron.generateAudioKokoro(text)
      setAudioUrl(base64Audio)
    } else {
      const base64Audio = await window.electron.generateAudioEdge(
        text,
        voice,
        lang
      )
      setAudioUrl(base64Audio)
    }
  }

  return (
    <div>
      <select
        value={ttsEngine}
        onChange={(e) => setTtsEngine(e.target.value as any)}
      >
        <option value='kokoro'>Kokoro TTS</option>
        <option value='edge'>Edge TTS</option>
      </select>

      {ttsEngine === 'edge' && (
        <>
          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {voices.map(({ label, voice }) => (
              <option key={voice} value={voice}>
                {label}
              </option>
            ))}
          </select>
        </>
      )}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Escribe un texto'
      />

      <button onClick={handleGenerate}>Generar audio</button>

      {audioUrl && <audio src={audioUrl} controls autoPlay />}
    </div>
  )
}

export default App
