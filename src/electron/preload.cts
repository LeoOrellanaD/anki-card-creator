const electron = require('electron')

const { contextBridge, ipcRenderer } = electron

contextBridge.exposeInMainWorld('electron', {
  generateAudio: (text: string) => ipcRenderer.invoke('generate-audio', text),


  // pepe: () => console.log('pepe'),
})
