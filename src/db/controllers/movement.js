import classesSchema from './models/classes'
import { normalizeId, dbConnect } from './util'

//get a list of movements
export async function getAll(movement) {
  await dbConnect()
  return movement.map(movements => normalizeId(movements))
  //it says this is not a function... why??
}

//add a movement to an existing or new class
export async function add(classesId, movement) {
  await dbConnect()
  const classes = await classesSchema.findByIdAndUpdate(
    classesId,
    { $addToSet: { movement: movement } },
    { new: true }
  )
  if (!classes) return null
  const addedExercise = classes.movement.find(movement => _id === movement.movementId)
  return normalizeId(addedExercise)
}

//delete a movement from a class
export async function remove(movementId, classesId) {
  await dbConnect()
  const updateClass = findByIdAndUpdate(
    classesId,
    {$pull: {movement: {_id: movementId}}},
    { new: true }
    )
    if (!updateClass) return null
    return true
}
