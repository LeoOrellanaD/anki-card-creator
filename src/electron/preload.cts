const { contextBridge, ipcRenderer } = require('electron')

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload?: EventPayloadMapping[Key][0] // ahora es opcional
): Promise<EventPayloadMapping[Key][1]> {
  return ipcRenderer.invoke(key, payload)
}

contextBridge.exposeInMainWorld('electron', {
  getAudioEdge: (payload) => ipcInvoke('generateAudioEdge', payload),
  createUser: (payload) => ipcInvoke('createUser', payload),
  getUsers: () => ipcInvoke('getUsers'),
  createLanguage: (payload) => ipcInvoke('createLanguage', payload),
  getLanguage: (payload) => ipcInvoke('getLanguage', payload),
  getLanguages: () => ipcInvoke('getLanguages'),
  createCard: (payload) => ipcInvoke('createCard', payload),
  getCard: (payload) => ipcInvoke('getCard', payload),
  getCards: () => ipcInvoke('getCards'),
  getConfig: () => ipcInvoke('getConfig'),
  saveConfig: (payload) => ipcInvoke('saveConfig', payload),
} satisfies Window['electron'])
