import ClienteController from "../Controller/clienteController.js";
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";
import { autorization } from "../middlewares/autorizationMiddleware.js";
const router = express.Router();

router.post("/cadastro", ClienteController.register);
router.post("/login", ClienteController.login);

router.use(authenticator)
router.get("/", autorization["admin"], ClienteController.listar);
router.delete("/:id", autorization["admin"], ClienteController.remover);


export default router;