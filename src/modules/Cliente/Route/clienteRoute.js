import ClienteController from "../Controller/clienteController.js";
import express from "express";
import { authenticator } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticator)

router.post("/cadastro", ClienteController.register);
router.post("/login", ClienteController.login);
router.get("/", ClienteController.listar);
router.delete("/:id", ClienteController.remover);

export default router;