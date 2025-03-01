import { Router } from "express"
import { registroE, getEmpresa, getEmpresas, edittarEm} from "./empre.controller.js"
import { createValidator, getEmpresaValidator, getEmpresasValidator, edditarEmValidator} from "../middlewares/validator_empresas.js"
 
const router = Router()

/**
 * @swagger
 * /registroE:
 *   post:
 *     summary: Registrar una nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tipo_empresa:
 *                 type: string
 *               phone:
 *                 type: string
 *               year_fundation:
 *                 type: number
 *               nivel_impacto:
 *                 type: string
 *               trayectoria:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa registrada
 *       500:
 *         description: Error al registrar
 */
router.post("/registroE", createValidator, registroE)

/**
 * @swagger
 * /listarT:
 *   get:
 *     summary: Listar todas las empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Datos exportados
 *       404:
 *         description: No hay empresas
 *       500:
 *         description: Error al obtener
 */
router.get("/listarT", getEmpresaValidator, getEmpresa)

/**
 * @swagger
 * /listar:
 *   get:
 *     summary: Listar empresas con filtros y orden
 *     tags: [Empresas]
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordenar por nombre
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoría
 *       - in: query
 *         name: trayectoria
 *         schema:
 *           type: string
 *         description: Filtrar por trayectoria
 *     responses:
 *       200:
 *         description: Empresas listadas
 *       404:
 *         description: No se encontró empresa
 *       500:
 *         description: Error al obtener
 */
router.get("/listar", getEmpresasValidator, getEmpresas)

/**
 * @swagger
 * /actualizarE/{uid}:
 *   put:
 *     summary: Actualizar información de una empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               tipo_empresa:
 *                 type: string
 *               phone:
 *                 type: string
 *               year_fundation:
 *                 type: number
 *               nivel_impacto:
 *                 type: string
 *               trayectoria:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error al actualizar
 */
router.put("/actualizarE/:uid", edditarEmValidator, edittarEm)

export default router