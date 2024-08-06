import Listing from "../models/listingModel.js"
import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const test= async(req,res)=>{
    res.json("messag:this is tes page")
}

    export const updateUser=async (req,res,next)=>{
    if(req.user.id !==req.params.id) return next(errorHandler(401,"you can only update your account"))
        const { userId } = req.params;
    const { email, phoneNumber, location, role,avatar} = req.body;
        try {
    if (req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,10)
    }
    const UpdateUser = await prisma.user.update({
        where: { id: parseInt(userId) },
        data,
      });

    // const {password:pass, ...rest}=userUpdate._doc
    res.status(200).json(UpdateUser)
            
        } catch (error) {
            next(error)
        }
    
}

export const deleteUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,"you can only delete your account"))
        const { userId } = req.params;

    try {
      await prisma.user.delete({ where: { id: parseInt(userId) } });
          res.clearCookie('access_token');

            res.status(200).json("user deleted successfully")

        } catch (error) {
            next(error)
        }

}
