import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id, req.userId)
        if (req.userId !== id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized"
            })
        }
        const { username, email, password } = req.body
        const updateData = {};

        if (username) {
            updateData.username = username;
        }

        if (email) {
            updateData.email = email;
        }

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, 
            updateData,
            { new: true }).select('-password')
        res.status(200).json({ message: 'User updated successfully', updatedUser })

    } catch (error) {
        console.log('error in updateUser', error)
        res.status(500).json({ error: "Internal server error" })
    }

}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        if (req.userId !== id) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized"
            })
        }
        await findByIdAndDelete(userId)
        res.status(204)
    } catch (error) {
        console.log('error in delete user', error)
        res.status(500).json({ error: "Internal server error" })
    }
}