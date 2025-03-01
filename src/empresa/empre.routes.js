import { Router } from "express"
import { registroE, getEmpresa, getEmpresas, edittarEm} from "./empre.controller.js"
import { createValidator, getEmpresaValidator, getEmpresasValidator, edditarEmValidator} from "../middlewares/validator_empresas.js"
 
const router = Router()

//url para registrar una empresa
router.post("/registroE", createValidator, registroE)

//url para lisyat todas las empresas
router.get("/listarT", getEmpresaValidator, getEmpresa)

//url para listar las empresas de A-Z, Z-A, por categoria y por trayectoria
router.get("/listar", getEmpresasValidator, getEmpresas)

//url para actualizar la informacion de una empresa
router.put("/actualizarE/:uid", edditarEmValidator, edittarEm)

export default router