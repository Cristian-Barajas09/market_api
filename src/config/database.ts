import * as mongoose from 'mongoose';

import {config} from 'dotenv';

config();


async function runDatabase(){
    mongoose.set("strictQuery", false)
    try {
        await mongoose.connect(process.env.DATABASE_URL ?? 'mongodb://localhost:27017/',{
            user:process.env.USER_DB,
            pass:process.env.PASSWORD_DB
        })
    } catch(err) {
        console.log(err);
    }
}

runDatabase()
    .then(()=> console.log("db is connect"))
    .catch((err)=> console.error(err))

export {
    runDatabase
};