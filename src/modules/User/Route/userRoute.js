import UsuarioController from "../Controller/userController.js";
import express from "express";
import { authenticator } from "../middlewares/auth.middleware.js";

const router = express.Router();

//publica

router.post("/cadastro", UsuarioController.register);
router.post("/login", UsuarioController.login);

//privada(admin)
router.use(authenticator)

router.get("/", UsuarioController.listar);
router.delete("/:id", UsuarioController.remover);

export default router;