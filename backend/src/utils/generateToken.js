import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "15m",
    })

    res.cookie("accessToken",accessToken,{
        maxAge: 15 * 60 * 1000, 
		httpOnly: true, 
		sameSite: "strict"
    })
}

export default generateTokenAndSetCookie