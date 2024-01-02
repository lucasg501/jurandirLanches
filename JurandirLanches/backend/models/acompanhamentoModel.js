const Database = require('../utils/database')

const conexao = new Database()

class AcompanhamentoModel {

    #acompanhamentoId;
    #acompanhamentoDescricao;

    get acompanhamentoId() {
        return this.#acompanhamentoId;
    }
    set acompanhamentoId(acompanhamentoId){
        this.#acompanhamentoId = acompanhamentoId;
    }

    get acompanhamentoDescricao() {
        return this.#acompanhamentoDescricao;
    }
    set acompanhamentoDescricao(acompanhamentoDescricao){
        this.#acompanhamentoDescricao = acompanhamentoDescricao;
    }

    constructor(acompanhamentoId, acompanhamentoDescricao){
        this.#acompanhamentoId = acompanhamentoId;
        this.#acompanhamentoDescricao = acompanhamentoDescricao;
    }

    async listar() {

        let lista = [];
        try{
            let sql = "select * from tb_acompanhamento";

            let rows = await conexao.ExecutaComando(sql);
    
            for(let i = 0; i<rows.length; i++){
    
                let acompanhamento = new AcompanhamentoModel(rows[i]["aco_id"], rows[i]["aco_descricao"]);
    
                lista.push(acompanhamento);
            }
        }
        catch {

        }


        return lista;
    }

    toJSON() {
        return {
            "acompanhamentoId": this.#acompanhamentoId,
            "acompanhamentoDescricao": this.#acompanhamentoDescricao
        };
    }
}

module.exports = AcompanhamentoModel;