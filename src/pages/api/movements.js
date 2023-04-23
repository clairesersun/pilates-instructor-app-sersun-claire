import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'
import classesSchema from "@/db/controllers/models/classes";

// this handler runs for /api/movements with any request method (GET, POST, etc)
//add, remove
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const classes = classesSchema.movement //how do I get the Id of a class out? I don't think this is correct
    switch(req.method) {
      // On a POST request, add a exercise
      case 'POST' :
        if (!classes) {
          return res.status(401).end() }
          try {
            const data = JSON.parse(req.body) //data is an object
            const addedExercise = await db.movement.add(classes.id, data) 
            if (!addedExercise) {
              req.session.destroy()
              return res.status(401).end
            }
            return res.status(200).json(addedExercise)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
          // TODO: On a DELETE request, remove an exercise
      case 'DELETE' :
        if (!classes) {
          return res.status(401).end()}
          try {
            const data = JSON.parse(req.body.movement)
            const deletedClass = await db.movement.remove(classes.id, data.id) 
            if (!deletedClass) {
              req.session.destroy()
              return res.status(401).end()
            }
            return res.status(200).json(deletedClass)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
      default:
        return res.status(404).end()
      }
      
      
    },
    sessionOptions
)








