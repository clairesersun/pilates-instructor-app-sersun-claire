import Classes from './models/classes'
import { normalizeId, dbConnect } from './util'

//get a list of movements
export async function getAll(classes) {
  await dbConnect()
  const classToSearch = await Classes.findById(classes.id)
  return classToSearch.exercises.map(exercises => normalizeId(exercises))
}

//add a movement to an existing or new class
export async function add(classesId, movement) {
  await dbConnect()
  const classes = await Classes.findByIdAndUpdate(
    classesId,
    { $addToSet: { exercises: movement } },
    { new: true }
  )
  if (!classes) return null
  const addedExercise = classes.exercises.findById(movement => _id === movement.movementId)
  return normalizeId(addedExercise)
}

//delete a movement from a class
export async function remove(movementId, classesId) {
  await dbConnect()
  const updateClass = Classes.findByIdAndUpdate(
    classesId,
    {$pull: {exercises: {_id: movementId}}},
    { new: true }
    )
    if (!updateClass) return null
    return true
}
