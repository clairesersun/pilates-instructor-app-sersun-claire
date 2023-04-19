import Exercise from '../models/movements'
import { normalizeId, dbConnect } from './util'

//maybe include an update here too? It wuold be an async function

export async function create(planeOfMotion, spinalMovement, bodyClassification, equipment, history, description, image, media, variations) {
  if (!(planeOfMotion && spinalMovement && bodyClassification && equipment && history))
    throw new Error('Must include plane of motion, spinal movement, body classification, equipment and history')

  await dbConnect()

  const exercise = await Exercise.create({planeOfMotion, spinalMovement, bodyClassification, equipment, history, description, image, media, variations})

  if (!user)
    throw new Error('Error inserting exercise')

  return normalizeId(exercise)
}