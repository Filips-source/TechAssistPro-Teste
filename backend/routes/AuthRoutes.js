import { Router } from "express";
import * as Auth from "../controllers/AuthController.js";
import { autenticar } from "../middlewares/AuthMiddleware.js";
export const authRouter = Router();
authRouter.post("/registrar", Auth.registrar);
authRouter.post("/login", Auth.login);
authRouter.get("/me", autenticar, Auth.me);
