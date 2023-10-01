import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Utils } from "../utils/utils";


export const validateToken = {
    authenticated(req:Request,res:Response,next:NextFunction){
        let token = req.headers.authorization
        console.log(token)
        const utils = new Utils();
        if(!token) return res.status(403).json({response:"you is not authorizated"})

        token = token.replace('Bearer ','')

        try {
            const decoded = jwt.verify(token,utils.APISECRET)
            if(!decoded) {
                return res.status(403).json({response:"invalidated token"})
            }
        } catch(err) {
            return res.status(403).json({response:"invalidated token"})
        }

        

        next();
    }
}