import jwt from "jsonwebtoken"
import User from '../model/User.js'
import dotenv from 'dotenv'
dotenv.config({ path: "./src/.env" })

export const protectRoute=async(req,res,next)=>{
  try{
   const token = req.cookie.jwt;
  if(!token){
    return re.status(401).json({message:"Unauthorised - token not provided"});
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  if(!decoded){
    return res.status(401).json({message:"Unauthorised - token not valid"});
  }

  const user = await User.findById(decoded.userId).select("-password");
  if(!user){
    return res.status(404).json({message:"User not found"})
  }
  req.user = user;
  next()
  }
  catch(err){
    console.log(`Error in auth middleware : ${err}`);
    return res.status(500).json({message:"Internal Server Error"})
  }
}
