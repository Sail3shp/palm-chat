import User from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import {generateTokenAndSetCookie} from "../utils/generateToken.js";

export const register = async(req,res) => {

    try {
        
        const {username,email,password} = req.body

        if(!username | !email | !password) {
            return res.status(400).json({
                status:"fail",
                error:"please provide all fields"
            })
        }

        const user = await User.findOne({email})

        if(user){
            res.status(400).json({
                status:"error",
                message:"User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        console.log(hash)

        const newUser = await User.create({
            username,
            email,
            password: hash
        })

        newUser.password = undefined
        generateTokenAndSetCookie(newUser._id,res)

        res.status(201).json({
            status:"success",
            newUser
        })

    } catch (error) {
       console.log('error in register',error)
       res.status(500).json({error: "Internal server error"}) 
    }

}

export const login = async(req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status:"error",
                message:"Please provide all required details"
            })
        }
        const user = await User.findOne({email})
        
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")
        
        if(!user || !isPasswordCorrect){
            return res.status(400).json({
                error:"Invalid username or password"
            })
        }

        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            status:"success",
            user:{
                _id: user._id,
                username:user.username,
                email: user.email
            }
        })
    } catch (error) {
       console.log('error in login',error)
       res.status(500).json({error: "Internal server error"})  
    }
}

export const logout = (req,res) => {
    try {

        const accessToken = req.cookies?.accessToken
        if (!accessToken) {
            return res.status(404).json({ message: 'Please login first' })
        }
        res.clearCookie("accessToken")
        res.status(200).json({ 
            status:"success",
            message: 'logged out successfully'
        })

        
    } catch (error) {
       console.log('error in logout',error)
       res.status(500).json({error: "Internal server error"})  
     
    }
}