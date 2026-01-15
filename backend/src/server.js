import express from "express"
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

dotenv.config({ path: "./src/.env" })
const app = express()
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url)
  next()
})
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Example app listening on port number ${port}`)
})
