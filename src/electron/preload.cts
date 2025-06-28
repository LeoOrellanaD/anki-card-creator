const electron = require('electron')

const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
  getAudioEdge: (payload) => ipcInvoke('generateAudioEdge', payload),
  getAudioKokoro: (payload) => ipcInvoke('generateAudioKokoro', payload),
  createUser: (payload) => ipcInvoke('createUser', payload),
  getUsers: () => ipcInvoke('getUsers', undefined),
} satisfies Window['electron']) // use to apply the type from the window object instead of doing this for each function

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  payload: EventPayloadMapping[Key][0]
): Promise<EventPayloadMapping[Key][1]> {
  return ipcRenderer.invoke(key, payload)
}
