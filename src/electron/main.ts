import { app, BrowserWindow } from 'electron'
import { isDev } from './utils.js'
import path from 'path'
import { getPreloadPath } from './pathResolver.js'
import { initDatabase } from './db/init.js'
import './ipc/ttsHandlerKokoro.js'
import './ipc/ttsHandlerEdge.js'
import './ipc/UserHandler.js'

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
