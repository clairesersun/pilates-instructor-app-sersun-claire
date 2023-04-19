import Classes from '../models/classes'
import { normalizeId, dbConnect } from './util'

//maybe include an update here too? It wuold be an async function
//maybe a delete too???

export async function create( className, exercises, dateCreated, location, equipment, description, order ) {
  if (!(className))
    throw new Error('Must include class name')

  await dbConnect()

  const classes = await Classes.create({className, exercises, dateCreated, location, equipment, description, order})

  if (!classes)
    throw new Error('Error inserting exercise')

  return normalizeId(classes)
}