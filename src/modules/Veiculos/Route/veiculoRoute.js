import VeiculoControler from "../Controller/veiculoController.js"
import express from "express";
import { authenticator } from "../middlewares/auth.middleware.js";
import UsuarioController from "../../User/Controller/userController.js";

const router = express.Router();
router.use(authenticator)

router.post("/cadastro", VeiculoControler.register);
router.get("/", VeiculoControler.listar);
router.delete("/:id", UsuarioController.remover);

export default router;