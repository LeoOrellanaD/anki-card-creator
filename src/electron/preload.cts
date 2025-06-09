const electron = require('electron')

const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
  generateAudioKokoro: (payload: ttsKokoro) =>
    ipcRenderer.invoke('generate-audio-kokoro', payload),
  generateAudioEdge: (payload: ttsEdge) =>
    ipcRenderer.invoke('generate-audio-edge', payload),

  // pepe: () => console.log('pepe'),
} satisfies Window['electron']) // use to aply the type from the window object instead of doing this for each function
