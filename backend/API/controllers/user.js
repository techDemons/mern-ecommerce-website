import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createCart } from "../services/cartService.js";

import dotenv from "dotenv";
dotenv.config();
const cookieOptions={
    expiresIn: new Date(Date.now(15*24*60*60*1000)),
   sameSite:"None",
    secure:true,
    httpOnly:true
}
const newUser = async (req, res)=>{

    try{

    const {firstName, lastName, email, password} = req.body;
    console.log(req.body);
    if(!firstName || !lastName|| !email|| !password) return res.status(401).json({
        success:false,
        message:"Fill the required entry"
    })
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(401).json({
            success:false,
            message:"This email/user already exits"
        })
    };

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 10);

    }catch(err){
        return res.status(410).json({
            success:false,
            message: "Error in hashing the password"
        })
    };

    const user = await User.create({
        firstName, lastName, email, password:hashedPassword
    });

    await createCart(user);


    const payload = {
        id:user._id,
        email:user.email
    };

    
    const token =  jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn:"10d"
    });
    
    user.password=undefined;
    return res.cookie("token", token, cookieOptions).status(201).json({
        success:true,
        message:"User created ",
        user,
        token
    })

}catch(err){
    console.log(err.message);

    return res.status(401).json({
            success:false,
            message:"User can't be created"
        })
    }

};
const login = async(req, res)=>{
    try {
        
   
    const {email, password, firstName, lastName} = req.body;

    if(!email || !password) return res.status(401).json({
        success:false,
        message:"Please provide email and password"
    });
    const user = await User.findOne({email}).select("+password");
    if(!user) return res.status(401).json({
        success:false,
        message:"Password or Email matching failed"
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({
        success:false,
        message:"Password or Email matching failed"
    });
     const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "10d" });

    // Hide password before sending
    user.password = undefined;

    // Send response with token
    return res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      message: "Login successful",
      user:user.firstName,
      token,
    });
 } catch (error) {
        console.log(error.message)
    }

}
const getUserById = async(req, res)=>{
    try {
        const {userId} = req.body;
        // console.log(userId)
        const user = await User.findById(userId).populate("address");
         if (!user) {
            return res.status(404).json({
                success: false,
                message: "Failed in accessing userId"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error.message);
        return res.status(404).json({
            success:false,
            message:"User not founnd"
        })
    }
};
const getUserByEmail = async(req, res)=>{
    try {
        //  const email = req.user?.email || req.body?.email;
        const {email} = req.user;//it makes optional to pass anything in body
        // const {email} = req.body;
        //i need to pass email in body if want to execute above line
         console.log(email);
if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found in request",
      });
    }        const user = await User.findOne({email}).select("-password");
        if(!user) return res.status(401).json({
            success:false,
            message:"Failed in accessing email"
        }); 
        return res.status(201).json({
            success:true,
            user
        })

    } catch (error) {
        console.error(error.message);
        
    }
}
const getAllUser = async(req, res)=>{
    try{
    const user = await User.find();
    if(!user) return res.status(401).json({

    })
    }catch(err){
        console.log(err.message);
    }
    
}
const logOut = async(req, res)=>{
    return res.cookie("token", null, {...cookieOptions, expiresIn:0}).status(201).json({
        success:true,
        message:"User logged out"
    })
}
const getUserProfile = async(req, res)=>{
    try {
        
    // const {_id} = req.user;we can also do this method but we need to pass _id inside the findById(_id) or next req.user syntax both are same;

    // console.log(userId)
    const userData = await User.findById(req.user);
    if(!userData ) return res.status(401).json({
        success:false,
        message:"User's profile not found"
    })
    return res.status(201).json({
        success:true,
        userData
    })
    } catch (error) {
        console.log(error.message);
    }
}
export {getUserByEmail, getUserById, newUser, login, logOut, getAllUser, getUserProfile}