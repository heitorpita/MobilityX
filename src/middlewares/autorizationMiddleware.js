function permitirPerfil(perfisPermitidos) {
 
    let lista = [];
    if (Array.isArray(perfisPermitidos)){

        lista = perfisPermitidos

    }
    else{
        lista = [perfispermitidos]
    }

    return (req, res, next) => {
        const perfil = req.usuario && req.usuario.perfil;
        if (lista.includes(perfil)) {
            return next()
        }
        return res.status(403).json({erro: "Acesso Negado, vc n tem acesso a esse serviço"})
    }

}

export const autorization = {
    admin: permitirPerfil(["admin"]),
    seller: permitirPerfil(["seller"])



};


export { permitirPerfis };
export default autorization;
