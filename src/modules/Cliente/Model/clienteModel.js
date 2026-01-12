import { query } from "../../../db/db.js";


export default class ClienteModel {

    static async listar() {
        const sql = `
        SELECT 
        id,
        name,
        document,
        email,
        phone,
        created_at
      FROM clients
      ORDER BY created_at DESC
        `;
        const result = await query(sql, []);
        return result.rows
    }

    static async buscarPorId(id) {
        const sql = `
        SELECT 
            id,
            name,
            document,
            email,
            phone,
            created_at
        FROM clients
        WHERE id = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0];
    }


  static async criar({ name, email, password, role }) {

    const sql = `
      INSERT INTO clients (name, document, email, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        document,
        email,
        phone,
        created_at
    `;

    const result = await query(sql, [
      name,
      document,
      email,
      phone

    ]);

    return result.rows[0];
  }

    static async verificarEmail(email) {
    const sql = `
      SELECT
        id,
        name,
        email
      FROM clients
      WHERE email = $1
    `;

    const result = await query(sql, [email]);
    return result.rows[0];
  }


  static async verificarDocumentos(documents){
    const sql = `
    SELECT
    id,
    name,
    document
    FROM clients 
    WHERE document = $1
    `;

    const result = await query(sql, [documents]);
    return result.rows[0]
  }

    static async remover(id) {
        const sql = `DELETE FROM clients WHERE id = $1`;
        await query(sql, [id]);
    }
}