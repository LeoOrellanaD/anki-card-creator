import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const configPath = path.join(app.getPath('userData'), 'config.json')

function getConfig(): Config {
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = {
      theme: 'light',
      language: 'en',
      languageList: [],
    }
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
    return defaultConfig
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
}

async function saveConfig(config: Config) {
  await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2))
}

export { getConfig, saveConfig }
