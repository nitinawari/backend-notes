const asynchandler=(requestHandler) =>{
         (res , req , next ) =>{
         Promise.resolve(requestHandler(res, req , next )).
         catch((err) => next(err))
         }
}

export {asynchandler}


// this is a highorder function 
// res,req ,next extracting from fn  
// const asynchandler = (fn) =>  async (res, req , next ) =>{
// try {
//          await fn(req , res , next) // executing fn come as a parameter 
         
// } catch (error) {
//          res.status(err.code || 500 ).json({
//                   success: false,
//                   message : err.message

//          })

// }
// }