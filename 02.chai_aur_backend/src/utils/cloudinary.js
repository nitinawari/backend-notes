
import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});



const uploadOnCloudinary = async(localfilepath)=>{
         try {
                  if(!localfilepath) return null
              const responce =   await cloudinary.uploader.upload(localfilepath,
                  {resource_type:"auto"}, 
                  )
                  //file as been uploaded successfull
                  console.log("file id uploaded on cloudinary  " , responce.url)
                  return responce
         } catch (error) {
               fs.unlinkSync(localfilepath)  
               //remove the locally saved temporary file as  the upload operation got failed 
              return null; 
         }
}