import VeiculoControler from "../Controller/veiculoController.js"
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";
import { autorization } from "../middlewares/autorizationMiddleware.js";

const router = express.Router();
router.use(authenticator)
router.post("/cadastro", autorization["admin"], VeiculoControler.register);
router.get("/", autorization["admin"], VeiculoControler.listar);
router.delete("/:id", autorization["admin"], VeiculoControler.remover);
export default router;