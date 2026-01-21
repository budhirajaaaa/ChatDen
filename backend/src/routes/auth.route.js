import express from 'express'
import {signup,login,logout,updateProfile} from '../controller/auth.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.put('/updateProfile',protectRoute,updateProfile)

export default router
