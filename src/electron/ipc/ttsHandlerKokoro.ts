import { ipcMainHandle } from '../utils.js'
import {
  handleKokoroTTS,
  testInternetConnection,
} from '../services/KokoroTTsService.js'

ipcMainHandle('generateAudioKokoro', handleKokoroTTS)
testInternetConnection()
