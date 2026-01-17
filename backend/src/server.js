import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import {connectDb} from './lib/db.js'
import path from "path"
dotenv.config({ path: "./src/.env" })

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url)
  next()
})
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)

if(process.env.NODE_ENV=="development"){
  app.use(express.static("../frontend/build"))

// For all routes not starting with /api
  app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve("../frontend/build/index.html"))
  })
}
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Example app listening on port number ${port}`)
  connectDb()
})
