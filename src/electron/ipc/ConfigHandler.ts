import { ipcMainHandle } from '../utils.js'
import { getConfig, saveConfig } from '../utils/userConfig.js'

ipcMainHandle('getConfig', async () => {
  return getConfig()
})

ipcMainHandle('saveConfig', async (config) => {
  await saveConfig(config)
  return { success: true }
})
