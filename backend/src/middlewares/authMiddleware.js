import jwt from "jsonwebtoken"
import { config } from "../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => { //To identify a middleware it must have next
        try {
            //#1 - Extract the token in the cookie (authCookie)
            //due to in the cookie is the type of user that logged in
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(404).json({message: "No cookie found, Authorization required"})
            }

            //Extract all the cookie information
            const decoded = jwt.verify(authCookie, config.JWT.secret);

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Access denied"})
            }

            next() // Continue to the next middleware or route handler

            
        } catch (error) {
            console.error("error: " + error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}
