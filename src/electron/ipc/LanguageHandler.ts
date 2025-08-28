import { ipcMainHandle } from '../utils.js'
import {
  createLanguageService,
  getLanguageService,
  getLanguagesService,
} from '../services/LanguageService.js'

ipcMainHandle('createLanguage', (data) => createLanguageService(data))
ipcMainHandle('getLanguage', (id) => getLanguageService(id))
ipcMainHandle('getLanguages', () => getLanguagesService())
