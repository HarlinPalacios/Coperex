import { Router } from "express";
import { loginA } from "./auth.controller.js"
import { loginValidator } from "../middlewares/login-validators.js";


const router = Router()

router.post("/login", loginA, loginValidator)

export default router 