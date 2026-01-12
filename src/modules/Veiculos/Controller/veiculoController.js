import VeiculoModel from "../Model/veiculoModel.js";

export default class VeiculosController{

    static async register(req,res){

        const {brand, model, year, price } = req.body;
        if(!brand || !model || !year || !price ){
            return res.status(400).json({msg: "Campos Brand, Model, Year, Price Ausentes tente novamente"})
        }

        if (price < 0 ) {
            return res.status(400).json({msg: "O valor do carro deve ser Maior que 0"})
        }

        const veiculo = await VeiculoModel.criar({
            brand,
            model,
            year,
            price
        });
        return res.status(201).json(veiculo)
    }

    static async listar(req,res){

        const veiculos = await VeiculoModel.listar();
        return res.json(veiculos)

    }

    static async remover(req, res) {
        
        const { id } = req.params;
        await VeiculoModel.remover(id);
        return res.status(201).send();

    }
}