import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin: ['http://localhost:5173'],
        methods: ["GET","POST"],
    },
})

const userSocketMap = {}

io.on("connection",(socket) => {
    console.log('a user connected',socket.id)

    const username = socket.handshake.query.username
    console.log(username)
    if(username ) {
        userSocketMap[username] = socket.id
    }
    io.emit('joinedUsers',Object.keys(userSocketMap))

    socket.on("sendMessage",(messageData) => {
        io.emit("receiveMessage",messageData)
    })

    socket.on('disconnect',() => {
        console.log('user disconnected',socket.id)
        delete userSocketMap[username]
        io.emit('joinedUsers',Object.keys(userSocketMap))
    })
})

export {app,io,server}