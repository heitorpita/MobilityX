import VeiculoControler from "../Controller/veiculoController.js"
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authenticator)
router.post("/cadastro", VeiculoControler.register);
router.get("/", VeiculoControler.listar);
router.delete("/:id", VeiculoControler.remover);

export default router;