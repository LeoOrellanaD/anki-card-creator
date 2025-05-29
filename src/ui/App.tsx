import { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  const handleGenerate = async () => {
    const base64Audio = await window.electron.generateAudio(text)
    setAudioUrl(base64Audio)
  }

  return (
    <div>
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
