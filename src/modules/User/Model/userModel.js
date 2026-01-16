import { query } from "../../../db/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

export default class UsuarioModel {


  static async listar() {
    const sql = `
      SELECT 
        id,
        name,
        email,
        role,
        created_at
      FROM users
      ORDER BY created_at DESC
    `;

    const result = await query(sql, []);
    return result.rows;
  }

  static async buscarPorId(id) {
    const sql = `
      SELECT
        id,
        name,
        email,
        role,
        created_at
      FROM users
      WHERE id = $1
    `;

    const result = await query(sql, [id]);
    return result.rows[0];
  }


  static async buscarComSenhaPorEmail(email) {
    const sql = `
      SELECT
        id,
        name,
        email,
        password_hash,
        role
      FROM users
      WHERE email = $1
    `;

    const result = await query(sql, [email]);
    return result.rows[0];
  }

  static async criar({ name, email, password, role }) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const sql = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        email,
        role,
        created_at
    `;

    const result = await query(sql, [
      name,
      email,
      passwordHash,
      role
    ]);

    return result.rows[0];
  }


  static async remover(id) {
    const sql = `DELETE FROM users WHERE id = $1`;
    await query(sql, [id]);
  }
}
