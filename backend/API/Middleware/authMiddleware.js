import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = async(req, res, next)=>{
    try{
        const token = req.cookies["token"];
        // console.log(token)
        if(!token) return res.status(404).json({
            success:false,
            message:"Token is not accessible"
        });

        const decodedJwt = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedJwt.id);
        req.user = user; 
        next();
        
    }catch(err){
        console.log(err.message);
        return res.status(404).json({
            message:"Only logged in user can access this route"
        });
    }
}