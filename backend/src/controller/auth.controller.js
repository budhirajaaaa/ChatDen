import User from '../model/User.js'
import bcrypt from "bcrypt"
import {generateToken} from "../lib/util.js"
import {sendWelcomeEmail} from '../emails/emailHandler.js'
export const signup=async(req,res)=>{
  try{
    const {fullName,email,password} = req.body;

    if(!fullName || !email || !password){
      return res.status(400).json({message:"All Fields are required"})
    }
    if(password.length<=6){
      return res.status(400).json({message:"Password length should be greater than 6"})
    }
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message:"Email already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt);
    const newUser = new User({
      fullName,
      email,
      password:hashedPass
    })
    if(newUser){
      await newUser.save();
      generateToken(newUser._id,res);
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
      })
      try{
        await sendWelcomeEmail(newUser.email,newUser.fullName,"http://localhost:4000/")
      }
      catch(err){
          console.log(`Error while sending Email err:${err}`)
      }
    }else{
      return res.status(400).json({message:"Invaid data"})
    }
  }
  catch(err){
    console.log(`Error while creating user err: ${err}`)
    res.status(500).json({message:"Internal server error"})
  }
}


export const login= async(req,res)=>{
  try{
  const {email,password} = req.body;
  console.log(email,password)
  const loggingUser = await User.findOne({email});
  if(!loggingUser){
    return res.status(400).json({message:"Invalid Email"})
  }
  const validPassword = await bcrypt.compare(password,loggingUser.password);
  if(!validPassword){
      return res.status(400).json({message:"Invalid Email"})
  }
  generateToken(loggingUser._id,res);
  return res.status(200).json({
    _id:loggingUser._id,
    fullName:loggingUser.fullName,
    email:loggingUser.email,
    profilePic:loggingUser.profilePic
  })
}
  catch(err){
    console.log(`Error logging user error:${err}`);
    return res.status(500).json({message:"Internal server error"});
  }
}

export const logout = (req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"User Logged out"})
}
