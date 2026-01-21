import User from '../model/User.js'
import Message from '../model/Message.js'


export const getAllContacts = async (req,res)=>{
  try{
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");
    return res.status(200).json(filteredUser)
  }
  catch(err){
    console.log(`Error in getAllContacts ${err}`);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const getMessageByUserId = async(req,res)=>{
  try{
    const loggedInUser = req.user._id;
    const anotherUserId = req.params.id;

    const messages = await Message.find({
      $or:[{senderId:loggedInUser,receiverId:anotherUserId},
            {senderId:anotherUserId,receiverId:loggedInUser}
      ]
    })
    return res.status(200).json(messages)


  }
  catch(err){
    console.log(`Error in getMessageByUserId ${err}`);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const sendToId = async(req,res)=>{
  try{
  const loggedInUser = req.user._id;
  const {text,image} = req.body
  const receiverId = req.params.id
  let imageUrl;
  if(image){
    const uploadedImage = await cloudinary.uploader.upload(image);
    imageUrl = uploadedImage.secure_url;
  }
  const newMessage = new Message({
    text,
    image:imageUrl,
    senderId:loggedInUser,
    receiverId
  })
  await newMessage.save();

  return res.status(201).json(newMessage)
  }
  catch(err){
    console.log(`Error sending message ${err}`);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const getChatPartners = async(req,res)=>{
  try{
    const loggedInUser = req.user._id;
    const messages = await Message.find({
      $or:[
        {senderId:loggedInUser},
        {receiverId:loggedInUser}
      ]
    })
    const chatPartners = [...new Set(messages.map(msg=>{
      if(msg.senderId==loggedInUser) return msg.receiverId;
      else return msg.senderId;
    }))]
    const users = await User.find({_id:{$in:chatPartners}}).select("-password")

    return res.status(200).json(users)
  }
  catch(err){
    console.log(`Error in getChatPartners ${err}`)
    return res.status(500).json({message:"Internal server error"})
  }
}
