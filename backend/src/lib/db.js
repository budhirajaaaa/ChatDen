import mongoose from "mongoose"

export const connectDb=async()=>{
  try{
    const connection =await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ",connection.connection.host)
  }
  catch(err){
    console.log(err);
    process.exit(1)
  }
}
