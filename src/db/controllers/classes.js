import { normalizeId, dbConnect } from './util'
import { add } from './movement'
import Classes from './models/classes'


//add classes from adding one exercise 
export async function create( classesId, className, datesTaught, location, description, exercises ) {
  if (!(className))
    throw new Error('Must include class name')

  await dbConnect()
  const addedExercises = add(classesId, exercises)
  const dateCreated = Date.now()
  const classes = await Classes.create({className, dateCreated, datesTaught, location, description, addedExercises})

  if (!classes)
    throw new Error('Error inserting exercise')

  return normalizeId(classes)
}


//show all classes
export async function getAll(userId) {
  console.log(userId)
  await dbConnect()
  const classes = await Classes.findById(userId).lean()
  if (!classes) return null // if there are none just return not return null
  return classes.map(classes => normalizeId(classes))
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
  const updatedClass = await Classes.findByIdAndUpdate(
    userId,
    { $set: { className, datesTaught, location, description } },
    { new: true }
  )
  if (!updatedClass) return null
  return normalizeId(updatedClass)
}

//delete classes
export async function remove(classesId) {
  await dbConnect()
  const removedClass = await Classes.findByIdAndUpdate(
    { $pull: { classesId } },
    { new: true }
  )
  if (!removedClass) return null
  return true
}