import jwt from 'jsonwebtoken'
export function verifyUser(req,res,next){
    try {
        const accessToken = req.cookies.accessToken
        if(!accessToken){
            return res.status(400).json({message:'Please login first'})
        }
        const decoded = jwt.verify(accessToken,process.env.JWT_SECRET)
        req.userId = decoded.userId
        console.log(decoded.userId)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized- Invalid access token" })
    } 

}
