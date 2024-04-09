import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse } from "../utils/ApiResponce.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
//this is a register user function wrap with asynchandler . it is a controller that extract from app.get it work similar app.get callback fn  
//it get execute when user hit this url whereregister has functionality
const registerUser = asyncHandler(async (req , res)=>{
// 1. get the user details from frontend 
// 2. validation - not empty body
// 3. check if user already exist - using  email or username
// 4. check for images , check for avatar 
// 5. upload them to  cloudinary , avatar 
// 6. create user object - create entry db  
// 7. remove the password and refresh token filed from responce 
// 8. check user reaction 
// 9. return responce
 const {username , email  , fullname , password} = req.body
     console.log('request boody : ' , req.body)
 if(fullname === ""){
     throw new ApiError(400 , "fullname is required ")
 }

if(
     [username , email  , fullname , password].some((field)=>field?.trim()==="") //checking  values are mepty or not 
){
     throw new ApiError(400 , "fullname is required ")
}

// user is directly connected to the mongodb though mongoose  so it can query directly 
  const userexisted = User.findOne({
     $or:[{email} , {username}] // 
 })
//  console.log(userexisted)

 if(userexisted){
     throw new ApiError(409 , "user or email already exist")
 }


 //check files already exist in public/tmp bfore uploading 
 const avatarLocalPath = req.files?.avatar[0]?.path
 const coverImageLocalPath = req.files?.coverImage[0]?.path

if(!avatarLocalPath){
     throw new ApiError(400 , 'avatar is required'  )
}

     const avatar = await uploadOnCloudinary(avatarLocalPath)
      const coverImage  = await uploadOnCloudinary(coverImageLocalPath)

      if(!avatar){
          throw new ApiError(400 , 'avatar is required')
      }


     const user =await User.create({
          fullname,
          avatar:avatar.url,
          coverImage: coverImage?.url || "",
          email,
          password,
          username:username.toLowerCase()

      })

     const createduser = await User.findById(user._id).select(
          "-password -refreshToken"
      )

     if(!createduser){
          throw new ApiError(500 , "something went wrong by registering user ")
     }


return res.status(200).json(
     new ApiResponce(200, createduser , "user registered succesfully ")
)
})


export {registerUser}