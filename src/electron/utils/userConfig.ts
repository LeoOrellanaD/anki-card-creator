import { app } from 'electron'
import fs from 'fs'
import path from 'path'

const configPath = path.join(app.getPath('userData'), 'config.json')

function getConfig(): Config {
  if (!fs.existsSync(configPath)) {
    return { theme: 'light', language: 'en', languageList: [] }
  }

  return JSON.parse(fs.readFileSync(configPath, 'utf-8'))
}

function saveConfig(config: Config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

export { getConfig, saveConfig }
