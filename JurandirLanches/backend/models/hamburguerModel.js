const Database = require('../utils/database')

const conexao = new Database()

class HamburguerModel {

    #hamburguerId;
    #hamburguerDescricao;

    get hamburguerId() {
        return this.#hamburguerId;
    }
    set hamburguerId(hamburguerId){
        this.#hamburguerId = hamburguerId;
    }

    get hamburguerDescricao() {
        return this.#hamburguerDescricao;
    }
    set hamburguerDescricao(hamburguerDescricao){
        this.#hamburguerDescricao = hamburguerDescricao;
    }

    constructor(hamburguerId, hamburguerDescricao){
        this.#hamburguerId = hamburguerId;
        this.#hamburguerDescricao = hamburguerDescricao;
    }

    async listar() {

        let lista = [];
        try{
            let sql = "select * from tb_hamburguer";

            let rows = await conexao.ExecutaComando(sql);
    
            for(let i = 0; i<rows.length; i++){
    
                let hamburguer = new HamburguerModel(rows[i]["ham_id"], rows[i]["ham_descricao"]);
    
                lista.push(hamburguer);
            }
        }
        catch {

        }


        return lista;
    }

    toJSON() {
        return {
            "hamburguerId": this.#hamburguerId,
            "hamburguerDescricao": this.#hamburguerDescricao
        };
    }
}

module.exports = HamburguerModel;