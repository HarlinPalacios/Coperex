import { Router } from "express";
import { loginA, createAdmin } from "./auth.controller.js"; // Import createAdmin
import { loginValidator } from "../middlewares/login-validators.js";


const router = Router()


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /auth/createAdmin:
 *   post:
 *     summary: Create a new admin user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/createAdmin", createAdmin); // Add createAdmin route

router.post("/login", loginA, loginValidator)

export default router