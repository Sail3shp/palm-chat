import express from 'express'
import { register,login,logout, getMe } from '../controller/auth.controller.js'
import { deleteUser, updateUser } from '../controller/user.controller.js'
import { verifyUser } from '../middleware/verifyUser.js'

const authRouter = express.Router()

//auth  model
authRouter.post('/login',login)
authRouter.post('/register',register)
authRouter.post('/logout',logout)

//user operation 

authRouter.patch('/update/:id',verifyUser,updateUser)
authRouter.delete('/delete/:id',verifyUser,deleteUser)
authRouter.get('/me',verifyUser,getMe)



export default authRouter