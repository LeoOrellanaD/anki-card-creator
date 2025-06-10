import { ipcMain } from 'electron'

export function isDev(): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.ELECTRON_IS_DEV === 'true'
  )
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: (payload: EventPayloadMapping[Key][0]) => Promise<EventPayloadMapping[Key][1]> | EventPayloadMapping[Key][1]
) {
  ipcMain.handle(key, (_event,payload) => {
    return handler(payload)
  })
}


