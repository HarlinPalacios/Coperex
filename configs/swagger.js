import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Empresas",
            version: "1.0.0",
            description: "API para sistemas de empresas",
            contact: {
                name: "Harlin Palacios",
                email: "hapalacios-2020586@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3003/empresa/v1"
            }
        ]
    },
    apis: [
        "./src/empresa/*.js",
        ".src/auth/*.js" 
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi}