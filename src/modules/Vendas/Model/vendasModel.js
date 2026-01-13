import { query } from "../../../db/db.js";

export default class VendasModel{

    static async listar(){

        const sql = `
        SELECT
            id,
            cliente_id,
            veiculo_id,
            usuario_id,
            valor,
            created_at
        FROM vendas
        ORDER BY created_at DESC
        `;
        const result = await query(sql, []);
        return result.rows;
    }
    
    static async criar({cliente_id, veiculo_id, usuario_id, valor}) {
        const sql = `
        SELECT
        * 
        FROM vendas
        WHERE id = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0];
    }
    
    static async criar({cliente_id, veiculo_id, usuario_id, valor}) {
        const sql = `
            INSERT INTO vendas (cliente_id, veiculo_id, usuario_id, valor)
            VALUES ($1, $2, $3, $4)
            RETURNING
            id,
            cliente_id,
            veiculo_id,
            usuario_id,
            valor,
            created_at
        `;
        const result = await query(sql, [cliente_id, veiculo_id, usuario_id, valor]);
        return result.rows[0];
    }

    static async remover(id){
        const sql = `DELETE FROM vendas WHERE id = $1`;
        await query(sql, [id]);
    
    }

    }