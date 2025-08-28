import { ipcMainHandle } from '../utils.js'
import { handleEdgeTTS } from '../services/EdgeTTSService.js'

ipcMainHandle('generateAudioEdge', handleEdgeTTS)
