import { model,Schema } from "mongoose";
import { IUser } from "../models/Users";

const userSchema = new Schema<IUser>({
    name: {type:String,required:true},
    lastname: {type:String,required:true},
    email: {type: String, unique:true,required:true},
    password:{type:String, required:true}
})

const User = model<IUser>('Users',userSchema);

export {
    User
}