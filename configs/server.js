"use strict"

import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import { createAdmin } from "../src/user/user.controller.js"
import registroRoutes from "../src/empresa/empre.routes.js"
import { swaggerDocs, swaggerUi} from "./swagger.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/empresa/v1/auth", authRoutes)
    app.use("/empresa/v1/empresa", registroRoutes)
    app.use("api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)) 
}

const conectarDB = async () =>{
    try{
        await dbConnection()
        await createAdmin()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}