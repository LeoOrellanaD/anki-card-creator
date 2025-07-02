import { useEffect, useState } from 'react'
import voicesEdge from './data/voices-edge'
import voicesKokoro from './data/voice-kokoro'

function App() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [ttsEngine, setTtsEngine] = useState<'kokoro' | 'edge'>('kokoro')
  const [usernameInput, setUsernameInput] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const [languageCode, setLanguageCode] = useState('')
  const [languageName, setLanguageName] = useState('')
  const [languages, setLanguages] = useState<Language[]>([])

  const langsEdge = Object.keys(voicesEdge)
  const langsKokoro = Object.keys(voicesKokoro)

  const [lang, setLang] = useState(
    ttsEngine === 'edge' ? langsEdge[0] : langsKokoro[0]
  )

  const [voice, setVoice] = useState(
    ttsEngine === 'edge'
      ? voicesEdge[langsEdge[0]][0].voice
      : voicesKokoro[langsKokoro[0]][0].voice
  )

  const handleGenerate = async () => {
    if (ttsEngine === 'kokoro') {
      const base64Audio = await window.electron.getAudioKokoro({
        text,
        voice,
      })
      setAudioUrl(base64Audio)
    } else {
      const base64Audio = await window.electron.getAudioEdge({
        text,
        voice,
        lang,
      })
      setAudioUrl(base64Audio)
    }
  }

  const handleCreateUser = async () => {
    if (!usernameInput.trim()) return
    await window.electron.createUser({ username: usernameInput })
    setUsernameInput('')
    loadUsers()
  }

  const loadUsers = async () => {
    const result = await window.electron.getUsers()
    setUsers(result)
  }

  const handleCreateLanguage = async () => {
    if (!languageCode.trim() || !languageName.trim()) return
    await window.electron.createLanguage({
      code: languageCode,
      language_name: languageName,
    })
    setLanguageCode('')
    setLanguageName('')
    loadLanguages()
  }

  const loadLanguages = async () => {
    const langs = await window.electron.getLanguages()
    setLanguages(langs)
  }

  useEffect(() => {
    loadUsers()
    loadLanguages()
  }, [])

  return (
    <div>
      <select
        value={ttsEngine}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const engine = e.target.value as 'kokoro' | 'edge'
          setTtsEngine(engine)

          if (engine === 'edge') {
            const defaultLang = langsEdge[0]
            setLang(defaultLang)
            setVoice(voicesEdge[defaultLang][0].voice)
          } else {
            const defaultLang = langsKokoro[0]
            setLang(defaultLang)
            setVoice(voicesKokoro[defaultLang][0].voice)
          }
        }}
      >
        <option value='kokoro'>Kokoro TTS</option>
        <option value='edge'>Edge TTS</option>
      </select>

      {ttsEngine === 'edge' && (
        <>
          <select
            value={lang}
            onChange={(e) => {
              const newLang = e.target.value
              setLang(newLang)
              setVoice(voicesEdge[newLang][0].voice)
            }}
          >
            {langsEdge.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {voicesEdge[lang].map(({ label, voice }) => (
              <option key={voice} value={voice}>
                {label}
              </option>
            ))}
          </select>
        </>
      )}

      {ttsEngine === 'kokoro' && (
        <>
          <select
            value={lang}
            onChange={(e) => {
              const newLang = e.target.value
              setLang(newLang)
              setVoice(voicesKokoro[newLang][0].voice)
            }}
          >
            {langsKokoro.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select value={voice} onChange={(e) => setVoice(e.target.value)}>
            {voicesKokoro[lang].map(({ label, voice }) => (
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

      <hr />
      <h3>Test Base de Datos (Usuarios)</h3>

      <input
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        placeholder='Nombre de usuario'
      />
      <button onClick={handleCreateUser}>Crear usuario</button>

      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.user_id} - {user.username}
          </li>
        ))}
      </ul>

      <hr />
      <h3>Test Base de Datos (Lenguajes)</h3>

      <input
        value={languageCode}
        onChange={(e) => setLanguageCode(e.target.value)}
        placeholder='Código (ej: en)'
      />
      <input
        value={languageName}
        onChange={(e) => setLanguageName(e.target.value)}
        placeholder='Nombre (ej: English)'
      />
      <button onClick={handleCreateLanguage}>Crear lenguaje</button>

      <ul>
        {languages.map((lang) => (
          <li key={lang.language_id}>
            {lang.language_id} - [{lang.code}] {lang.language_name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
