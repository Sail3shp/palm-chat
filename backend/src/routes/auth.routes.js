import express from 'express'
import { register } from '../controller/auth.controller.js'

const authRouter = express.Router()

//user creation model
//authRouter.post('/login',login)
authRouter.post('/register',register)
//authRouter.post('/logout',logout)


export default authRouter