import { ipcMainHandle } from '../utils.js'
import { getConfig, saveConfig } from '../utils/userConfig.js'

ipcMainHandle('getConfig', () => getConfig())
ipcMainHandle('saveConfig', async (config) => {
  saveConfig(config)
  return undefined // this fix the problem with async situacion with the create file config
})
