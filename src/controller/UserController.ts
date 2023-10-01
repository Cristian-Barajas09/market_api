import { Request, Response } from "express";
import { CustomRequest } from "../models/Express";
import { UserResponse } from "../models/Users";
import { Utils } from "../utils/utils";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {


    async getUserbyId(req:Request,res:Response){
        const { id } = req.params

        try {
            const user = await prisma.user.findFirst({
                where:{
                    id:parseInt(id)
                }
            });
            return res.json({user}).status(200)
        } catch (err) {
            return res.json({}).status(404)
        }
    }
    async createUser(req:CustomRequest<UserResponse>,res:Response) {
        const { name,lastname,email,password } = req.body

        if (!name || !lastname || !email || !password) return res.status(400).json({response:"los campos no pueden estar vacios"})

        const utils = new Utils();

        try {
            const newPassword = await utils.encryptPassword(password);

            const newUser = await prisma.user.create({
                data:{
                    name,
                    lastname,
                    email,
                    password:newPassword
                }
            })
            
            const token = jwt.sign(newUser,utils.APISECRET)
            await prisma.$disconnect();
            return res.json({token}).status(201);
        }catch(err) {
            console.error(err);
            await prisma.$disconnect();
            return res.json({response:'a ocurrido un error'}).status(400);
        }
    }

    async getUsers(req:Request,res:Response) {
        const users = await prisma.user.findMany({select:{name:true,lastname:true,email:true}})

        return res.json({users})
    }

    async login(req:CustomRequest<{email:string,password:string}>,res:Response){
        const {email,password} = req.body
        const utils = new Utils();

        const user =await prisma.user.findFirst({
            where:{
                email
            }
        })

        if (!user) {
            return res.status(403)
        }

        const match = await utils.matchPassword(password,user.password);

        if(!match) return res.status(403)

        const token = jwt.sign(user,utils.APISECRET)
        return res.json({token})
    }
}