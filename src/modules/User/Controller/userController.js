import UsuarioModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UsuarioController {

  static async register(req, res) {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Campos obrigatórios ausentes" });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: "Senha deve ter no mínimo 8 caracteres" });
    }

    const usuarioExistente =
      await UsuarioModel.buscarComSenhaPorEmail(email);

    if (usuarioExistente) {
      return res.status(409).json({ msg: "Email já cadastrado" });
    }

    const user = await UsuarioModel.criar({
      name,
      email,
      password,
      role
    });

    return res.status(201).json(user);
  }


  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios" });
    }

    const user =
      await UsuarioModel.buscarComSenhaPorEmail(email);

    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!senhaValida) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role , email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }


  static async listar(req, res) {
    try {
       const users = await UsuarioModel.listar();
    return res.json(users);
    } catch (error) {
      res.status(500).json({msg: "Erro ao listar usuarios", erro: error.message})       
    }
   
  }


  static async remover(req, res) {
    const { id } = req.params;

    await UsuarioModel.remover(id);
    return res.status(204).send();
  }
}
