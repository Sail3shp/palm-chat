import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/connectDb.js'

dotenv.config()

const app = express()
console.log(process.env.PORT)
const PORT = process.env.PORT || 8848

app.get('/health',(req,res) => {
    res.send("All good")
})


app.listen(PORT,async() => {
    await connectDb()
    console.log(`server is running on port ${PORT}`)
})