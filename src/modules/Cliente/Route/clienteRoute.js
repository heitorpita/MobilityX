import ClienteController from "../Controller/clienteController.js";
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/cadastro", ClienteController.register);
router.post("/login", ClienteController.login);

router.use(authenticator)
router.get("/", ClienteController.listar);
router.delete("/:id", ClienteController.remover);

export default router;