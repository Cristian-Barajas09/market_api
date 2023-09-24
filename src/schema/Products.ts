import {model,Schema,} from 'mongoose';
import { IProducts } from 'models/Products';

const productSchema = new Schema<IProducts>({
    name:{type:String,required:true},
    price:{type:Schema.Types.Decimal128, required:true},
    description:{type:String},
    marca:{type:String}
})

const Product = model<IProducts>('Products',productSchema);

export {
    Product
}