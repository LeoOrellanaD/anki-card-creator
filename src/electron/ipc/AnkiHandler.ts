import { ipcMainHandle } from '../utils.js'
import { addCard, createDeck } from '../services/AnkiService.js'

ipcMainHandle('createDeck', async (payload: string) => {
  return await createDeck(payload)
})

ipcMainHandle('addCard', async (payload: CardPayload) => {
  return await addCard(payload)
})
