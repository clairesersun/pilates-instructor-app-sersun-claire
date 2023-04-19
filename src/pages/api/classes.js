import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

//WHAT DO I NEED TO DO HERE? EVERYTHING
// this handler runs for /api/classes with any request method
export default withIronSessionApiRoute(
  async function handler(req, res) {
    const user = req.session.user
    switch(req.method) {
      // TODO: On a POST request, do what? create class with the name and first exercise
      case 'POST' :
        return create(req, res)
      case 'PUT' :
        return update(req, res)
        //do I need a GET option? I think so.
      case 'GET' :
        return receive(req, res)
      case 'DELETE' :
        return remove(req, res)
    default:
       return res.status(404).end()  
    }},
    sessionOptions
)



//create the functions down below to make it easier to read


async function create(req, res) {
    if (!user) {
        return res.status(401).end() }
        try {
          const data = JSON.parse(req.body) //data is an object {}
          //push information to this json
          //finish the function
        } catch (err) {
            return res.status(400).json({error: err.message})
            }
    }
async function update(req, res) {
    if (!user) {
        return res.status(401).end() }
        try {
          const data = JSON.parse(req.body) //data is an object {}
          //anything changed by user will be updated
          //finish the function
      } catch (err) {
          return res.status(400).json({error: err.message})
          }  
}

async function receive(req, res) {
    if (!user) {
        return res.status(401).end() }
        try {
          const data = JSON.parse(req.body) //data is an object {}
          //anything changed by user will be updated
          //finish the function
      } catch (err) {
          return res.status(400).json({error: err.message})
          }  
}

async function remove(req, res) {
    if (!user) {
        return res.status(401).end() }
        try {
            //delete all class information... can you have a confirmation? would that go here?
            //finish the function
        }
        catch (err) {
            return res.status(400).json({error: err.message})
            }
}