const electron = require('electron')

const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
  generateAudioKokoro: (text: string) =>
    ipcRenderer.invoke('generate-audio-kokoro', text),
  generateAudioEdge: (text: string, voice?: string, lang?: string) =>
    ipcRenderer.invoke('generate-audio-edge', text, voice, lang),

  // pepe: () => console.log('pepe'),
})
