import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './config/connectDb.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import chatRouter from './routes/chat.routes.js'
import { getStats } from './controller/stats.controller.js'
import { app, server } from './socket/socket.js'

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
console.log(process.env.PORT)
const PORT = process.env.PORT || 8848

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/chat',chatRouter)
app.get('/api/v1/chat/stats',getStats)
app.get('/health',(req,res) => {
    res.send("All good")
})


server.listen(PORT,async() => {
    await connectDb()
    console.log(`server is running on port ${PORT}`)
})