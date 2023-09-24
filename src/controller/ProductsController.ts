import { Product } from "../schema/Products";
import { Response,Request } from "express";
import { CustomRequest } from "../models/Express";

export class ProductsController {

    async getProducts(req:Request,res:Response){
        const products = await Product.find()

        return res.json({"response":products})
    }

    async createProduct(req:CustomRequest<
        {
            name:string,price:number,description:string,marca:string
        }
    >,res:Response) {
        const {name,price,description,marca} = req.body

        try {
            const product = new Product({
                name,
                price,
                description,
                marca
            })

            await product.save()
            return res.json({message:"product is created",product:{name,price,description,marca}}).status(200)
        } catch(err){
            console.error(err)
            return res.json({message:"error"}).status(400)
        }
    }
    async getProductById(req:Request,res:Response){
        const { id } = req.params;
        const product = await Product.findById(id);

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
        const {name,price,description} = req.body
        try {
            await Product.findByIdAndUpdate(id,{name,price,description});
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
            await Product.findByIdAndDelete(id)
            return res.json({
                response: id
            }).status(204)
        }catch( err ) {
            return res.json({
                response:"no se pudo eliminar el objeto"
            })
        }

    }
}