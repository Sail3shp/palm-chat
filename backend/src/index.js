import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/connectDb.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
console.log(process.env.PORT)
const PORT = process.env.PORT || 8848

app.use('/api/v1/auth',authRouter)
app.get('/health',(req,res) => {
    res.send("All good")
})


app.listen(PORT,async() => {
    await connectDb()
    console.log(`server is running on port ${PORT}`)
})