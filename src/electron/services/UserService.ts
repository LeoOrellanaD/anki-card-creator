import { createUser, getUser } from '../models/UserModel.js'


export const createUserService = (data: CreateUserInput): number => {
  if (!data.username.trim()) throw new Error('name is required')
  return createUser(data)
}

export const getUsersService = (): User[] => {
  return getUser()
}
