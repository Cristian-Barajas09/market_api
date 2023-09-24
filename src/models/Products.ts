import { Schema } from "mongoose";
export interface IProducts {
    name:string;
    price:Schema.Types.Decimal128;
    description?:string,
    marca?:string
}