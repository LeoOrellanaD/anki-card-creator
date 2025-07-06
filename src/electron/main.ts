import { app, BrowserWindow } from 'electron'
import { isDev } from './utils.js'
import path from 'path'
import { getPreloadPath } from './pathResolver.js'
import { initDatabase } from './db/init.js'

import { cleanAudioDir } from './utils/audioCleaner.js'

import './ipc/ttsHandlerKokoro.js'
import './ipc/ttsHandlerEdge.js'
import './ipc/UserHandler.js'
import './ipc/LanguageHandler.js'
import './ipc/CardHandler.js'

app.on('ready', () => {
  initDatabase()
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  })
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }
})

app.on('will-quit', cleanAudioDir)
