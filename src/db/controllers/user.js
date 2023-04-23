import User from './models/user'
import { normalizeId, dbConnect } from './util'

//do I need to create a delete async function?

export async function create(username, email, igHandle, password) {
  if (!(username && email && igHandle && password))
    throw new Error('Must include username, email, Instagram Handle and password')

  await dbConnect()

  const user = await User.create({username, email, igHandle, password})

  if (!user)
    throw new Error('Error inserting user')

  return normalizeId(user)
}