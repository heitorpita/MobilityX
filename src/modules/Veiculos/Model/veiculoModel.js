import { query } from "../../../db/db.js";

export default class VeiculoModel{

    static async listar(){
        const sql = `
        SELECT
            id,
            brand,
            model,
            year, 
            price,
            status,
            created_at
        FROM vehicles
        ORDER BY created_at DESC
        `;
        const result = await query(sql, []);
        return result.rows;
    }

    static async buscarPorId(id){
        const sql = `
        SELECT
            *
        FROM vehicles
        WHERE id = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0];

    }

    static async criar({brand, model, year, price }) {
        const sql = `
            INSERT INTO vehicles (brand, model, year, price)
            VALUES ($1, $2, $3, $4)
            RETURNING
            id,
            brand,
            model,
            year,
            price,
            status,
            created_at
        `;
        const result = await query(sql, [
            brand,
            model,
            year,
            price
        ]);
        return result.rows[0];
    }
    static async remover(id){
        const sql = `DELETE FROM users WHERE id = $1`;
        await query(sql, [id]);
    }
    
}