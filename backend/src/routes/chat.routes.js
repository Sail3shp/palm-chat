import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { getMessages, sendMessage } from '../controller/chat.controller.js'

const chatRoutes = express.Router()

chatRoutes.post('/send',verifyUser,sendMessage)
chatRoutes.get('/messages',getMessages)

export default chatRoutes