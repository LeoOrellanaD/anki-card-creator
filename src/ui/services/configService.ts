export interface ConfigService {
  getConfig: () => Promise<Config>
  saveConfig: (config: Config) => Promise<void>
}

export const electronConfigService: ConfigService = {
  getConfig: async () => {
    if (!window.electron) {
      throw new Error('Electron not available')
    }
    return await window.electron.getConfig()
  },
  saveConfig: async (config) => {
    if (!window.electron) {
      throw new Error('Electron not available')
    }
    await window.electron.saveConfig(config)
  },
}
