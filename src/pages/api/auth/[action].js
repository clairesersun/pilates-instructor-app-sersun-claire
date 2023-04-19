import sessionOptions from "../../../config/session"
import { withIronSessionApiRoute } from "iron-session/next"; //install this via git repo!
import db from '../../../db'

// this file handles /api/auth/:action with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  function handler(req, res) {
    // console.log(req.query.action)
    // console.log(req.method)
    const action = req.query.action
    switch(req.method) {
      case 'POST' :
      switch(action) {
        // handle login with CRUD Post
        case 'login' :
          return login(req, res)
          case 'logout': 
          //handle logout with CRUD POST
          return logout(req, res)
          // // handle login with CRUD Post
          case 'signup' :
            return signup(req, res)
          }
        case 'DELETE' :
          switch (action) {
            case 'delete' :
            //deleteAccount with CRUD delete
              return deleteAccount(req, res)
          }
        }
          return res.status(404).end()
        },
        sessionOptions
)

async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await db.auth.login(username, password)
    req.session.user = {
      username: user.username,
      id: user.id
    }
    await req.session.save()
    res.status(200).end()
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}

async function logout(req, res) {
  await req.session.destroy()
  res.status(200).end()
}

async function signup(req, res) {
  try {
    const {username, email, igHandle, password} = req.body
    const user = await db.user.create(username, email, igHandle, password) 
    //I am recieving an error here... Why?
//      Cannot read properties of undefined (reading 'create')
    req.session.user = {
      username: user.username,
      email: user.email,
      igHandle: user.igHandle,
      id: user.id
    }
    await req.session.save()
    res.redirect('/')
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}

//double check this works
async function deleteAccount(req, res) {
  try {
    const user = await models.User.findById(req.params.id);
    await user.remove();
    await req.session.destroy()
    res.status(200).json({
      message: 'Deleted!'
    }).redirect('/signin')
  } catch(err) {
    res.status(400).json({error: err.message})
  }
}