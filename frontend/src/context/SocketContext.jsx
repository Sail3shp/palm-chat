import {
    useState,
    useContext,
    useEffect,
    createContext
} from 'react'
import io from 'socket.io-client'
import { useAuth } from './AuthContext'


export const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {
    const {user} = useAuth()
    const [socket,setSocket] = useState(null)
    const [joinedUsers,setJoinedUsers] = useState([])
    
    useEffect(() =>{
        if(user){
            const socket = io('http://localhost:5432',{
                query: {
                    userId: user._id,
                    username: user.username
                }
            })
            setSocket(socket)

            socket.on('joinedUsers',(users) => {
                setJoinedUsers(users)
            })

            return () => socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }

    },[user])
    
    return <SocketContext.Provider value={{socket,joinedUsers}}>{children}</SocketContext.Provider>
}
export const useSocketContext = () => useContext(SocketContext)