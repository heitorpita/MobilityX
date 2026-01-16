export function perfispermitidos(perfisPermitidos) {
 
    let lista = [];
    if (Array.isArray(perfisPermitidos)){

        lista = perfisPermitidos

    }
    else{
        lista = [perfisPermitidos]
    }

    return (req, res, next) => {
        const perfil = req.user && req.user.role;
        if (lista.includes(perfil)) {
            return next()
        }
        return res.status(403).json({erro: "Acesso Negado, vc n tem acesso a esse serviço"})
    }

}

export const autorization = {
    admin: perfispermitidos(["admin"]),
    seller: perfispermitidos(["seller"])



};



export default autorization;
