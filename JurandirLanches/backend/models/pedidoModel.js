const Database = require('../utils/database');
const AcompanhamentoModel = require('./acompanhamentoModel');
const HamburguerModel = require('./hamburguerModel');
const PaoModel = require('./paoModel');
const QueijoModel = require('./queijoModel');

const conexao = new Database()

class PedidoModel {

    #pedidoId;
    #pedidoNome;
    #pedidoData;
    #queijo;
    #hamburguer;
    #acompanhamento;
    #pao;

    get pedidoId() {
        return this.#pedidoId;
    }
    set pedidoId(pedidoId) {
        this.#pedidoId = pedidoId;
    }
    get pedidoNome() {
        return this.#pedidoNome;
    }
    set pedidoNome(pedidoNome) {
        this.#pedidoNome = pedidoNome;
    }

    get pedidoData() {
        return this.#pedidoData;
    }
    set pedidoData(pedidoData) {
        this.#pedidoData = pedidoData;
    }

    get queijo() {
        return this.#queijo;
    }
    set queijo(queijo) {
        this.#queijo = queijo;
    }

    get hamburguer() {
        return this.#hamburguer;
    }
    set hamburguer(hamburguer) {
        this.#hamburguer = hamburguer;
    }

    get pao() {
        return this.#pao;
    }
    set pao(pao) {
        this.#pao = pao;
    }

    get acompanhamento() {
        return this.#acompanhamento;
    }
    set acompanhamento(acompanhamento) {
        this.#acompanhamento = acompanhamento;
    }

    constructor(pedidoId, pedidoNome, pedidoData, queijo, pao, hamburguer, acompanhamento) {
        this.#pedidoId = pedidoId;
        this.#pedidoNome = pedidoNome;
        this.#pedidoData = pedidoData;
        this.#queijo = queijo;
        this.#hamburguer = hamburguer;
        this.#pao = pao;
        this.#acompanhamento = acompanhamento;
    }

    async gravar() {

        let sql = "insert into tb_pedido (ped_nome, ped_data, pao_id, que_id, ham_id, aco_id) values (?, now(), ?, ?, ?, ?)";

        let valores = [this.#pedidoNome, this.#pao.paoId, this.#queijo.queijoId, this.#hamburguer.hamburguerId, this.#acompanhamento.acompanhamentoId];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async listar() {

        let sql = `select * from tb_pedido p 
        inner join tb_queijo q on p.que_id = q.que_id
        inner join tb_pao pa on p.pao_id = pa.pao_id
        inner join tb_hamburguer h on p.ham_id = h.ham_id
        inner join tb_acompanhamento a on p.aco_id = a.aco_id`;

        let rows = await conexao.ExecutaComando(sql);

        let listaPedidos = [];

        for(let i = 0; i<rows.length; i++){
            let row = rows[i];
            let pedido = new PedidoModel();
            pedido.pedidoId = row["ped_id"];
            pedido.pedidoNome = row["ped_nome"];
            pedido.pedidoData = row["ped_data"];
            pedido.queijo = new QueijoModel(row["que_id"], row["que_descricao"]);
            pedido.acompanhamento = new AcompanhamentoModel(row["aco_id"], row["aco_descricao"]);
            pedido.pao = new PaoModel(row["pao_id"], row["pao_descricao"]);
            pedido.hamburguer = new HamburguerModel(row["ham_id"], row["ham_descricao"]);

            listaPedidos.push(pedido);
        }

        return listaPedidos;
    }

    toJSON() {
        return {
            "pedidoId": this.#pedidoId,
            "pedidoNome": this.#pedidoNome,
            "pedidoData": this.#pedidoData,
            "queijo": this.#queijo.toJSON(),
            "acompanhamento": this.#acompanhamento.toJSON(),
            "pao": this.#pao.toJSON(),
            "hamburguer": this.#hamburguer.toJSON(),
        };
    }
}

module.exports = PedidoModel;
