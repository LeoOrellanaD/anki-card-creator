import { ipcMainHandle } from '../utils.js'
import { createUserService, getUsersService } from '../services/UserService.js'

ipcMainHandle('createUser', (data) => createUserService(data))
ipcMainHandle('getUsers', () => getUsersService())
