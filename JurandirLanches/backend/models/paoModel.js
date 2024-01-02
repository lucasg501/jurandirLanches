const Database = require('../utils/database')

const conexao = new Database()

class PaoModel {

    #paoId;
    #paoDescricao;

    get paoId() {
        return this.#paoId;
    }
    set paoId(paoId){
        this.#paoId = paoId;
    }

    get paoDescricao() {
        return this.#paoDescricao;
    }
    set paoDescricao(paoDescricao){
        this.#paoDescricao = paoDescricao;
    }

    constructor(paoId, paoDescricao){
        this.#paoId = paoId;
        this.#paoDescricao = paoDescricao;
    }

    async listar() {

        let lista = [];

        try{
            let sql = "select * from tb_pao";

            let rows = await conexao.ExecutaComando(sql);
    
            for(let i = 0; i<rows.length; i++){
    
                let pao = new PaoModel(rows[i]["pao_id"], rows[i]["pao_descricao"]);
    
                lista.push(pao);
            }
        }
        catch {

        }


        return lista;
    }

    toJSON() {
        return {
            "paoId": this.#paoId,
            "paoDescricao": this.#paoDescricao
        };
    }
}

module.exports = PaoModel;