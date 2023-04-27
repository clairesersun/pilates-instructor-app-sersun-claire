import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import Classes from '../../db/controllers/models/classes'
import movement from '../../db'


// this handler runs for /api/movements with any request method (GET, POST, etc)
//add, remove
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const userId = req.session.user
    const classes = Classes.findById(userId)
    switch(req.method) {
            
            case 'GET' :
              if (!classes) {
                return res.status(401).end() }
                try {
                  const allClasses = await Classes.getAll(classes) 
                  if (!allClasses) {
                    req.session.destroy()
                    return res.status(401).end
                  }
                  return res.status(200).json(allClasses)
                } catch (err) {
                  return res.status(400).json({error: err.message})
                }
      // On a POST request, add a exercise
      case 'POST' :
        if (!classes) {
          return res.status(401).end() }
          try {
            const data = JSON.parse(req.body) //data is an object
            const addedExercise = await movement.add(classes.id, data) 
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








