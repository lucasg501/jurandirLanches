const Database = require('../utils/database')

const conexao = new Database()

class QueijoModel {

    #queijoId;
    #queijoDescricao;

    get queijoId() {
        return this.#queijoId;
    }
    set queijoId(queijoId){
        this.#queijoId = queijoId;
    }

    get queijoDescricao() {
        return this.#queijoDescricao;
    }
    set queijoDescricao(queijoDescricao){
        this.#queijoDescricao = queijoDescricao;
    }

    constructor(queijoId, queijoDescricao){
        this.#queijoId = queijoId;
        this.#queijoDescricao = queijoDescricao;
    }

    async listar() {

        let lista = [];
        try {
        
            let sql = "select * from tb_queijo";

            let rows = await conexao.ExecutaComando(sql);
    
            for(let i = 0; i<rows.length; i++){
    
                let queijo = new QueijoModel(rows[i]["que_id"], rows[i]["que_descricao"]);
    
                lista.push(queijo);
            }
        }
        catch{

        }

        return lista;
    }

    toJSON() {
        return {
            "queijoId": this.#queijoId,
            "queijoDescricao": this.#queijoDescricao
        };
    }
}

module.exports = QueijoModel;