import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import Movement from '../../db/controllers/models'
import Classes from '../../db/controllers/models'

// this handler runs for /api/movements with any request method (GET, POST, etc)
//add, remove
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const classes = Classes.id.movement.id //how do I get the Id of a class out? I don't think this is correct
    switch(req.method) {
      // On a POST request, add a exercise
      case 'POST' :
        if (!classes) {
          return res.status(401).end() }
          try {
            const data = JSON.parse(req.body) //data is an object
            const addedExercise = await Movement.add(classes.id, data) 
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
            const data = JSON.parse(req.body)
            const deletedExercise = await Classes.remove(data.id) 
            if (!deletedExercise) {
              req.session.destroy()
              return res.status(401).end()
            }
            return res.status(200).json(deletedExercise)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
      default:
        return res.status(404).end()
      }
      
      
    },
    sessionOptions
)








