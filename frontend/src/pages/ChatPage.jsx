import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useSocketContext } from "../context/SocketContext"
import api from "../utils/axiosInstance"
import { CircleArrowRight } from "lucide-react"
const ChatPage = () => {
    const { user } = useAuth()
    const { joinedUsers,socket } = useSocketContext()

    const [messages, setMessages] = useState([])
    const [userMessage, setUserMessage] = useState('')

    const [stats, setStats] = useState({
        totalChat: null,
        totalUsers: null
    })

    const fetchMessage = async () => {
        try {
            const res = await api.get('/chat/messages')
            const getStats = await api.get('/chat/stats')

            setMessages(res.data.data)
            setStats((prev) => ({
                ...prev,
                totalChat: getStats.data.totalChat,
                totalUsers: getStats.data.totalUsers
            }),
            )
            console.log(joinedUsers)

        } catch (error) {
            console.log(error.message)
            setMessages([])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!userMessage.trim()) return

        const newMessage ={
            sender:{
                username: user.username,
            },
            message: userMessage
        }
        try {
             await api.post('/chat/send', {
                message: userMessage
            })
            socket.emit("sendMessage",newMessage)
            setUserMessage("")
        } catch (error) {
            console.log(error.message)
        }

        console.log(userMessage)
    }

    useEffect(() => {
        fetchMessage()
        console.log(messages)
    }, [])

    useEffect(() => {
        if (!socket) return

        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message])
        })

        return () => {
            socket.off("receiveMessage")
        }
    }, [socket])

    return (
        <section className="relative flex w-full h-screen justify-center items-center">
            <div className="p-2 mr-10 absolute top-0 right-0 max-w-sm ">
                <h1>
                    total-Chat: {stats.totalChat}
                </h1>
                <h1>
                    total-Users: {stats.totalUsers}
                </h1>
            </div>
            <div className="w-full max-w-7xl p-4  mx-auto ">
                <div className="flex flex-col max-w-full justify-center items-center">
                    {messages.map((message) => (
                        <div key={message._id} className="flex gap-4">
                            <h1>[{message.sender.username}]</h1>
                            <p>{message.message}</p>
                        </div>
                    ))}
                    <div>
                        <h1>Online Users</h1>

                        {joinedUsers.map((user, index) => (
                            <p key={index}>{user}</p>
                        ))}
                    </div>

                    <h1 className="text-xl font-bold"> Hi, {user?.username}</h1>

                    <div className="flex relative max-w-5xl w-full items-center justify-center mx-auto">
                        <input className="border max-w-5xl mx-auto border-slate-400 rounded-lg w-full px-4 py-7" type="text"

                            onChange={(e) => {
                                setUserMessage(e.target.value)
                            }}
                            value={userMessage}
                            placeholder="Type something.."
                        />

                        <button
                            onClick={handleSubmit}
                            className="hover:scale-110 duration-150
                        absolute right-0 mr-2 text-lg cursor-pointer rounded-full p-1 "><CircleArrowRight /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ChatPage