import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"

export const verifyToken=(req,res,next)=>{

    
    try {
      const token=req.cookies.access_token
      if (!token) return next(errorHandler(401,"unauthorized"))
        else{

        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
         if (err) return next(errorHandler(next(401,"forbidden")))
 
          req.user=user   
          next()
        }) 
      }
      
    } catch (error) {
      console.log(error.message);
    }
  

    
}