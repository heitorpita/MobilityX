import express from "express";
import "dotenv/config";
import UsuarioRoutes from "./src/modules/User/Route/userRoute.js"
import ClientRoutes from "./src/modules/Cliente/Route/clienteRoute.js"
import VeiculoRoutes from "./src/modules/Veiculos/Route/veiculoRoute.js"
import VendasRoutes from "./src/modules/Vendas/Route/vendasRoute.js"
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/user", UsuarioRoutes);
app.use("/client", ClientRoutes);
app.use("/veiculos", VeiculoRoutes);
app.use("/vendas", VendasRoutes);

app.listen(port, () => console.log(`Aplicacao Rodando em http://localhost:${port}`))