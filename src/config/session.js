import { IronSessionOptions } from "iron-session";


export default {
    cookieName: "yoga_planning_auth_cookie",
    password: process.env.IRON_PASS,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }

  //use ReactSession: https://github.com/grizzthedj/react-session