import UsuarioController from "../Controller/userController.js";
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";
import { autorization } from "../middlewares/autorizationMiddleware.js";
const router = express.Router();

//publica

router.post("/", UsuarioController.register);
router.post("/login", UsuarioController.login);

//privada(admin)
router.use(authenticator)
router.get("/", autorization["admin"], UsuarioController.listar);
router.delete("/:id", autorization["admin"],UsuarioController.remover);

export default router;