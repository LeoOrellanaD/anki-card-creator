import { ipcMainHandle } from '../utils.js'
import { handleKokoroTTS } from '../services/KokoroTTsService.js'

ipcMainHandle('generateAudioKokoro', handleKokoroTTS)
