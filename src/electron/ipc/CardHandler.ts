import { ipcMainHandle } from '../utils.js'
import {
  createCardService,
  getCardService,
  getCardsService,
} from '../services/CardService.js'

ipcMainHandle('createCard', (data) => createCardService(data))
ipcMainHandle('getCard', (id) => getCardService(id))
ipcMainHandle('getCards', () => getCardsService())
