import VendasController from "../Controller/vendasController.js";
import express from "express";
import { authenticator } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(authenticator)
router.post("/cadastro", VendasController.register);
router.get("/", VendasController.listar);
router.delete("/:id", VendasController.deletar);

export default router;