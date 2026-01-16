import VendasModel from '../Model/vendasModel.js';

export default class VendasController {

    static async register(req, res) {
        try {
            const { cliente_id, veiculo_id, usuario_id, valor } = req.body;

            if (!cliente_id || !veiculo_id || !usuario_id || !valor) {
                return res.status(400).json({
                    msg: "Campos Cliente_ID, Veiculo_ID, Usuario_ID ou Valor ausentes"
                });
            }

            const novaVenda = await VendasModel.criar({
                cliente_id,
                veiculo_id,
                usuario_id,
                valor
            });

            return res.status(201).json(novaVenda);

        } catch (error) {
            return res.status(500).json({
                msg: "Erro interno ao registrar venda",
                erro: error.message
            });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { cliente_id, veiculo_id, usuario_id, valor } = req.body;

            if (!cliente_id || !veiculo_id || !usuario_id || !valor) {
                return res.status(400).json({
                    msg: "Campos Cliente_ID, Veiculo_ID, Usuario_ID ou Valor ausentes"
                });
            }

            const vendaAtualizada = await VendasModel.atualizar(id, {
                cliente_id,
                veiculo_id,
                usuario_id,
                valor
            });

            return res.status(200).json(vendaAtualizada);

        } catch (error) {
            return res.status(500).json({
                msg: "Erro interno ao atualizar venda",
                erro: error.message
            });
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;
            await VendasModel.remover(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({
                msg: "Erro interno ao deletar venda",
                erro: error.message
            });
        }
    }


    static async listar(req, res) {
        try {
            const vendas = await VendasModel.listar();
            return res.json(vendas);
        } catch (error) {
            res.status(500).json({
                msg: "Erro interno ao listar vendas",
                erro: error.message
            });           
        }

}




}
