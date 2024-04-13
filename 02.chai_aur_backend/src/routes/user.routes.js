


import {Router }from "express";
import { registerUser , loginUser , logoutUser , refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
 
const router  = Router(); //creating router 
  
router.route("/register").post(
         upload.fields([
                  {
                           name:"avatar",
                           maxcount : 1
                  },{
                           name: "coverImage",
                           maxcount:1
                  }
         ]),
         registerUser)  // giving router for particular endpoint with mehthod like get , poaat  and function to execute here registeruser 

router.route("/login").post(loginUser)
router.route ("/logout").post(verifyJWT , logoutUser)

//secured routes - means user must be logedin
router.route ("/refresh-token").post(refreshAccessToken)
export default router
