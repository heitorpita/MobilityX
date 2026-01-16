import jwt from "jsonwebtoken";

export function authenticator(req, res, next){

    const autHeader = req.headers["authorization"];

    const token = autHeader && autHeader.split(" ")[1];

    if(!token){
        res.status(401).json({msg: "ACESSO NEGADO"})
        return;

    }
    try {
        
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.user = usuario;

        next()

    } catch (error) {
        res.status(403).json({msg: "erro interno na autorizacao", erro: error.message})
    }

}