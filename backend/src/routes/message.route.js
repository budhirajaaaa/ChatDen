import express from 'express'
import {getAllContacts,getMessageByUserId,sendToId,getChatPartners} from '../controller/message.controller.js'
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();


router.get('/getAllContacts',protectRoute,getAllContacts)
router.get('/getChatPartners',protectRoute,getChatPartners)
router.get('/:id',protectRoute,getMessageByUserId)
router.post('/send/:id' ,protectRoute, sendToId)
export default router
