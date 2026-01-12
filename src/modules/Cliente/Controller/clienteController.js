import ClienteModel from "../models/clienteModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class ClienteController {

    static async register(req, res) {
        const { name, document, email, phone} = req.body;
        if(!name || !document || !email || !phone){
            return res.status(400).json({msg: "Campos de nome documento email e phone ausentes tente novamente"})
        } 
        
        const usuarioExistente = await ClienteModel.verificarEmail(email);
        
        if (usuarioExistente) {
            return res.status(409).json({ msg: "Email já cadastrado" });
        }

        const client = await ClienteModel.criar({
            name,
            document,
            email,
            phone
        });
        return res.status(201).json(user);
    }

    static async login(req, res){
        const {email, document} = req.body;

        if(!email || !document){
            return res.status(400).json({msg: "Email e Documento são Obrigatorios"})
        }
        const client = await ClienteModel.verificarEmail(email);

        if(!client){
            return res.status(401).json({ msg: "Email inválido" });
        }
        
        const clientDoc = await ClienteModel.verificarDocumentos(documents);
        if(!clientDoc){
            return res.status(401).json({msg:"Documento Invalido"})
        }
    }

    static async listar(req, res) {
        const clients = await ClienteModel.listar();
        return res.json(clients);
    }

    static async remover(req, res){

        const { id } = req.params;
        await ClienteModel.remover(id);
        return res.status(204).send();

    }

}

