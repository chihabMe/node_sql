import { Router } from "express";
import { loginController, registrationController } from "./controllers";

export const accountsRouter = Router();
accountsRouter.post("/registration", registrationController);
accountsRouter.post("/login", loginController);
