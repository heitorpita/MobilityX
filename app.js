import express from express;
import "dotenv/config";
import UsuarioRoutes from "./src/modules/User/Route/userRoute.js"
import ClientRoutes from "./src/modules/Cliente/Route/clienteRoute.js"
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/user", UsuarioRoutes);
app.use("client", ClientRoutes);


app.listen(port, () => console.log(`Aplicacao Rodando em http://localhost:${port}`))