import Chat from "../model/chat.model.js";

export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body
        if(!message || !message.trim()){
            return res.status(400).json({
                status:"error",
                message:"Message is required"
            })
        }

        const newMessage = await Chat.create({
            sender: req.userId,
            message
        })

        const populatedMessage = await Chat.findById(newMessage._id).populate("sender","username")

        res.status(201).json({
            status:"success",
            data: populatedMessage
        })
        
    } catch (error) {
        console.log("send Message Error",error)
        res.status(500).json({
            error:"Internal server error"
        })
    }

}

export const getMessages = async(req,res) => {
    try {
        const allMessages = await Chat.find().sort({createdAt:-1}).limit(50).populate("sender","username")
        res.status(200).json({
            status:"success",
            data:allMessages
        })
    } catch (error) {
       console.log("send Message Error",error)
        res.status(500).json({
            error:"Internal server error"
        }) 
    }
}