import {PrismaClient} from '@prisma/client'
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

export const signup= async (req,res,next)=>{

   const { email, password, location,  phoneNumber,role }=req.body;

    try {
        const registeredUser = await prisma.user.findUnique({ where: { email } });

    if (registeredUser) {
      return next(errorHandler(400,"User already registered")) ;
    }
  const hashed_password=bcrypt.hashSync(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed_password,
      location,
      phoneNumber,
      role,
    },
  });

    res.status(200).json("signup succesfully")
        
    } catch (error) {
       next(error)
    }


}

export const signin=async (req,res,next)=>{
    const {email,password}=req.body;
    try {
        const validUser = await prisma.user.findUnique({ where: { email } });
        if(!validUser) return next(errorHandler(404,"user not found"))
        const validPassword= bcrypt.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,"invalid username or password")) 
       
    

    const token =jwt.sign({id:validUser.id,role:validUser.role},process.env.JWT_SECRET) 
        // const {password:pass,...rest}=validUser._doc 
    
    res.cookie('access_token',token,{httpOnly:true})
     .status(200)
     .json(validPassword)
        
    } catch (error) {
        next(error)
        
    }
}

export const google= async (req,res,next)=>{
    try {
    const user = await prisma.user.findUnique({ where: { email } });
    if(user){
      const token =jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET) 
    //   const {password:pass,...rest}=user._doc 
        
        res.cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(user)
        
    }
    else{
        const generatedPassword=Math.random().toString(36).slice(-8)+ Math.random().toString(36).slice(-8)
        const location=Math.random().toString(36).slice(-8);
        const phoneNumber=Math.random().toString(36).slice(-8);
        const role="RENTER";

        const hashPassword=bcrypt.hashSync(generatedPassword,10)
        const user = await prisma.user.create({
            username:req.body.username.split(" ").join("").toString() + Math.random(),
            email:req.body.email,
            password:generatedPassword,
            avatar:req.body.photo,
            phoneNumber,
            role

        })

        res.status(200).json("signup succesfully")
 
        const token =jwt.sign({id:newUser._id},process.env.JWT_SECRET)  
        // const {password:pass,...rest}=newUser._doc

        
        res.cookie('access_token',token,{httpOnly:true})
         .status(200)
         .json(user)

    }
    } catch (error) {
      next(error)
    }


}
export const signOut= async(req,res,next)=>{
    try {

        res.clearCookie('access_token');

          res.status(200).json("user logged out successfully")

      } catch (error) {
          next(error)
      }

}