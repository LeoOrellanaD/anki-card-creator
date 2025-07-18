import { useEffect, useState } from 'react'
import voicesEdge from './data/voices-edge'

function App() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(
    null
  )
  const [languages, setLanguages] = useState<Language[]>([])

  const langsEdge = Object.keys(voicesEdge)
  const [lang, setLang] = useState(langsEdge[0])
  const [voice, setVoice] = useState(voicesEdge[langsEdge[0]][0].voice)

  const handleGenerate = async () => {
    const base64Audio = await window.electron.getAudioEdge({
      text,
      voice,
      lang,
    })
    setAudioUrl(base64Audio)
  }

  const getCurrentDate = (): string => {
    const now = new Date()
    return now.toISOString().split('T')[0]
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

  const loadLanguages = async () => {
    const langs = await window.electron.getLanguages()
    setLanguages(langs)
  }

  const handleCreateCard = async () => {
    if (!selectedUserId || !selectedLanguageId) return
    const card = {
      date: getCurrentDate(),
      language_id: selectedLanguageId,
      user_id: selectedUserId,
    }
    await window.electron.createCard(card)
  }

  useEffect(() => {
    loadUsers()
    loadLanguages()
  }, [])

  return (
    <div>
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

      <h4>Selecciona un lenguaje</h4>
      <select
        value={selectedLanguageId ?? ''}
        onChange={(e) => setSelectedLanguageId(Number(e.target.value))}
      >
        <option value=''>-- Elegir lenguaje --</option>
        {languages.map((lang) => (
          <option key={lang.language_id} value={lang.language_id}>
            [{lang.code}] {lang.language_name}
          </option>
        ))}
      </select>

      <hr />
      <h3>Test Crear Card</h3>

      <label>Usuario:</label>
      <select
        value={selectedUserId ?? ''}
        onChange={(e) => setSelectedUserId(Number(e.target.value))}
      >
        <option value=''>-- Seleccionar usuario --</option>
        {users.map((u) => (
          <option key={u.user_id} value={u.user_id}>
            {u.username}
          </option>
        ))}
      </select>

      <label>Lenguaje:</label>
      <select
        value={selectedLanguageId ?? ''}
        onChange={(e) => setSelectedLanguageId(Number(e.target.value))}
      >
        <option value=''>-- Seleccionar lenguaje --</option>
        {languages.map((l) => (
          <option key={l.language_id} value={l.language_id}>
            {l.language_name}
          </option>
        ))}
      </select>

      <button onClick={handleCreateCard}>Crear card</button>
    </div>
  )
}

export default App



