const AcompanhamentoModel = require("../models/acompanhamentoModel");
const HamburguerModel = require("../models/hamburguerModel");
const PaoModel = require("../models/paoModel");
const PedidoModel = require("../models/pedidoModel");
const QueijoModel = require("../models/queijoModel");


class PedidoController {

    async listarPao(req, res) {
        let pao = new PaoModel();
        let lista = await pao.listar();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }

    
    async listarHamburguer(req, res) {
        let hamburguer = new HamburguerModel();
        let lista = await hamburguer.listar();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }

    
    async listarQueijo(req, res) {
        let queijo = new QueijoModel();
        let lista = await queijo.listar();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }

    
    async listarAcompanhamento(req, res) {
        let acompanhamento = new AcompanhamentoModel();
        let lista = await acompanhamento.listar();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }


    async gravarPedido(req,res){
        if(req.body.pedidoNome != "" && req.body.queijo != "" && req.body.pao != "" && req.body.hamburguer != "" && req.body.acompanhamento != ""){
            let pedido = new PedidoModel();
            pedido.pedidoId = 0;
            pedido.pedidoNome = req.body.nome;
            pedido.queijo = new QueijoModel(req.body.queijo);
            pedido.pao = new PaoModel(req.body.pao);
            pedido.hamburguer = new HamburguerModel(req.body.hamburguer);
            pedido.acompanhamento = new AcompanhamentoModel(req.body.acompanhamento);
            let ok = await pedido.gravar();
            if(ok)
                res.status(200).json({msg: "Pedido gravado com sucesso!"});
            else
                res.status(400).json({msg: "Erro ao gravar pedido"});
        }else{
            res.status(401).json({msg:"Parametros invalidos"});
        }
    }

    async listarPedidos(req, res) {

        let pedido =new PedidoModel();
        let lista = await pedido.listar();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })

        res.status(200).json(listaJson);
    }
}

module.exports = PedidoController