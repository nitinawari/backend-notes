


import {Router }from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
 
const router  = Router(); //creating router 
  
router.route("/register").post(
         upload.fields([
                  {
                           name:" avatar ",
                           maxcount : 1
                  },{
                           name: "coverImage",
                           maxcount:1
                  }
         ]),
         registerUser)  // giving router for particular endpoint with mehthod like get , poaat  and function to execute here registeruser 

// router.route("/login").get(loginuser)

export default router
