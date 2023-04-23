import classesSchema from './models/classes'
import { normalizeId, dbConnect } from './util'
import { add } from './movement'
import db from "../../db"


//add classes from adding one exercise 
export async function create( classesId, className, datesTaught, location, description, exercise ) {
  if (!(className))
    throw new Error('Must include class name')

  await dbConnect()
  const addedExercises = add(classesId, exercise)
  const dateCreated = Date.now()
  const classes = await db.classes.create({className, dateCreated, datesTaught, location, description, addedExercises})

  if (!classes)
    throw new Error('Error inserting exercise')

  return normalizeId(classes)
}


//show all classes
export async function getAll(userId) {
  await dbConnect()
  const usersClasses = await db.classes.findMany(userId).lean()
  if (!usersClasses) return  // if there are none just return not return null
  return usersClasses.map(usersClasses => normalizeId(usersClasses))
}


//update/edit classes 
//to do when update: update the className, datesTaught, location, description, and 
//order of or remove exercise <-- need to figure out how to do this
        // Array.prototype.move = function (from, to) {
        //   this.splice(to, 0, this.splice(from, 1)[0]);
        // };
        // var ar = [1,2,3,4,5];
        // ar.move(0,3);
        // alert(ar) // 2,3,4,1,5
export async function update(userId, className, datesTaught, location, description) {
  await dbConnect()
  const classes = await classesSchema.findByIdAndUpdate(
    userId,
    { $set: { className, datesTaught, location, description } },
    { new: true }
  )
  if (!classes) return null
  return normalizeId(classes)
}

//delete classes
export async function remove(classesId) {
  await dbConnect()
  const removedClass = await classesSchema.findByIdAndUpdate(
    { $pull: { classesId } },
    { new: true }
  )
  if (!removedClass) return null
  return true
}