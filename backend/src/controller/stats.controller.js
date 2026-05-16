import Chat from "../model/chat.model.js";
import User from "../model/user.model.js";

export const getStats = async(req,res) => {
   try {
    const [totalChat,totalUsers] = await Promise.all([
        Chat.countDocuments(),
        User.countDocuments()
    ])
    res.status(200).json({
        status:"success",
        totalChat,
        totalUsers
    })
   } catch (error) {
        console.log('error in stats', error)
        res.status(500).json({ error: "Internal server error" })
    
   } 
}