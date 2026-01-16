import VendasController from "../Controller/vendasController.js";
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";
import { autorization } from "../middlewares/autorizationMiddleware.js";
const router = express.Router();

router.use(authenticator)
router.post("/cadastro", autorization["admin"], VendasController.register);
router.get("/", autorization["admin"], VendasController.listar);
router.delete("/:id", autorization["admin"], VendasController.deletar);

export default router;