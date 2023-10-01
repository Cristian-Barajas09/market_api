import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();
export class Utils {

    APISECRET = process.env.APISECRET ?? '';

    async encryptPassword(password:string) {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password,salt);

        return hash
    }
    async matchPassword(password:string,savedPassword:string){
        try {
            return await bcrypt.compare(password,savedPassword)
        }catch(err){
            console.log(err);
        }
    }
}