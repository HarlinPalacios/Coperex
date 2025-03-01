import { body } from "express-validator"
import { validarCampos } from "../middlewares/validate-fields.js"
import { handleErrors } from "../middlewares/handle-errors.js"
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";


export const createValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("tipo_empresa").notEmpty().withMessage("El tipo de empresa es requerida"),
    body("phone").notEmpty().withMessage("El telefono es requerido"),
    body("year_fundation").notEmpty().withMessage("El año es requerido"),
    body("nivel_impacto").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("trayectoria").notEmpty().withMessage("El año de trayectoria es requerida"),
    body("categoria").notEmpty().withMessage("La categoria es requerida"),

    validarCampos,
    handleErrors
]

export const edditarEmValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("tipo_empresa").notEmpty().withMessage("El tipo de empresa es requerida"),
    body("phone").notEmpty().withMessage("El telefono es requerido"),
    body("year_fundation").notEmpty().withMessage("El año es requerido"),
    body("nivel_impacto").notEmpty().withMessage("El nivel de impacto es requerido"),
    body("trayectoria").notEmpty().withMessage("El año de trayectoria es requerida"),
    body("categoria").notEmpty().withMessage("La categoria es requerida"),

    validarCampos,
    handleErrors
]

export const getEmpresaValidator = [
    validateJWT,

    validarCampos,
    handleErrors
]

export const getEmpresasValidator = [
    validateJWT,

    validarCampos,
    handleErrors
]

export const edittarEmValidator = [
    validateJWT,

    validarCampos,
    handleErrors
]