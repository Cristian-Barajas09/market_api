import { PrismaClient } from "@prisma/client";
import { Response,Request } from "express";
import { CustomRequest } from "../models/Express";

const prisma = new PrismaClient();

export class ProductsController {

    async getProducts(req:Request,res:Response){
        const products = await prisma.product.findMany()
        await prisma.$disconnect();
        return res.json({"response":products})
    }

    async createProduct(req:CustomRequest<
        {
            name:string,price:number,description:string,marca:string
        }
    >,res:Response) {
        const {name,price,description,marca} = req.body

        try {
            const product = await prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    marca
                }
            })
            await prisma.$disconnect()
            return res.json({message:"product is created",product:{name,price,description,marca}}).status(200)
        } catch(err){
            console.error(err)
            await prisma.$disconnect()
            return res.json({message:"error"}).status(400)
        }
    }
    async getProductById(req:Request,res:Response){
        const { id } = req.params;
        const product = await prisma.product.findFirst({
            where:{
                id : parseInt(id)
            }
        });
        await prisma.$disconnect();
        return res.json({product}).status(200)
    }

    async updateProduct(req:CustomRequest<
        {

            name?:string,
            price?:number,
            description?:string
        }
    >,res:Response){
        const { id } = req.params
        const { name,price,description } = req.body
        try {
            await prisma.product.update({
                where:{
                    id:parseInt(id)
                },
                data:{
                    name,
                    price,
                    description
                }
            })
            await prisma.$disconnect();
            return res.json({
                response:req.body
            })
        }catch(err) {
            return res.json({
                response:"no se pudo actualizar el objeto"
            })
        }
    }
    async deleteProduct(req:Request,res:Response){
        const { id } = req.params

        try {
            await prisma.product.delete({where:{id:parseInt(id)}})
            await prisma.$disconnect();
            return res.json({
                response: id
            }).status(204)
        }catch( err ) {
            console.error(err);
            await prisma.$disconnect();
            return res.json({
                response:"no se pudo eliminar el objeto"
            })
        }

    }
}