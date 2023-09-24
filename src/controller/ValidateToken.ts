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

        console.log(jwt.verify(token,utils.APISECRET))

        if(!jwt.verify(token,utils.APISECRET)) {
            return res.status(403).json({response:"invalidated token"})
        }

        next();
    }
}