// create, update, remove
//do I need read?
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import Classes from "@/db/controllers/models";

// this handler runs for /api/classes with any request method (GET, POST, etc)
//create, update, remove
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const classes = Classes.get(_id) //how do I get the Id of a class out? I don't think this is correct
    switch(req.method) {
      // On a POST request, add a exercise to new class
      case 'POST' :
        //create
        if (!classes) {
          return res.status(401).end() }
          try {
            const data = JSON.parse(req.body) //data is an object
            const addedClass = await Classes.add(user.id, data) 
            if (!addedClass) {
              req.session.destroy()
              return res.status(401).end
            }
            return res.status(200).json(addedClass)
          } catch (err) {
            return res.status(400).json({error: err.message})
          }
          //On a PUT request, update a class
      case 'PUT' :
        if (!classes) {
          return res.status(401).end()
        }
        try {
          const data =JSON.parse(req.body)
          const updatedClass = await Classes.update(data)
          if (!updatedClass) {
            req.session.destroy()
            return res.status(401).end()
          }
          return res.status(200).json(updatedClass)
        } catch (err) {
          return res.status(400).json({error: err.message})
        }

          //On a DELETE request, remove a class
      case 'DELETE' :
        //remove
        if (!classes) {
          return res.status(401).end()}
          try {
            const data = JSON.parse(req.body)
            const deletedClass = await Classes.remove(data.id) 
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






