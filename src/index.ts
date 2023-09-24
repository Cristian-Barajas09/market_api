import express from "express";
import { Application } from "express";
import products from "./routes/products";
import './config/database';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import user from "./routes/user";
import { config } from 'dotenv';
import {join,resolve} from 'path'
import { validateToken } from "./controller/ValidateToken";
config();

const app : Application = express();
const PREFIX = '/api/v1';


//settings
app.set("port",parseInt(process.env.PORT ?? ''));



const options:swaggerJSDoc.Options = {
    definition:{
        openia:'3.0.0',
        info: {
            title: 'Supermarket api',
            version:'1.0.0',
            description:"the supermarket api"
        },
        host:`http://localhost:${app.get("port")}`,
        servers:[{url:`http://localhost:${app.get("port")}`}]
    },
    apis:['./routes/*.js','./routes/*.ts']
}

const swaggerSpec = swaggerJSDoc(options);




//midlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use(`${PREFIX}/docs`,swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use(PREFIX,products);
app.use(`${PREFIX}/users`,user);


app.use(`${PREFIX}/static`,validateToken.authenticated,express.static(join(__dirname,'static')))


app.listen(app.get("port"),()=> {
    console.log(`server running on port ${ app.get("port") }`)
});