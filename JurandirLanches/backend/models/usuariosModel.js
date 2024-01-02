const Database = require('../utils/database');

const banco = new Database()
class UsuarioModel {

    #id;
    #nome;
    #email;
    #perfilId;
    #ativo;
    #senha;
    #dataCadastro

    get senha() {
        return this.#senha;
    }
    set senha(senha){
        this.#senha = senha;
    }

    get id(){
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }
    
    set nome(nome) {
        this.#nome = nome;
    }

    get email(){
        return this.#email;
    }
    
    set email(email) {
        this.#email = email;
    }

    get perfilId(){
        return this.#perfilId;
    }
    
    set perfilId(perfilId) {
        this.#perfilId = perfilId;
    }

    get ativo(){
        return this.#ativo;
    }
    
    set ativo(ativo) {
        this.#ativo = ativo;
    }

    get dataCadastro(){
        return this.#dataCadastro;
    }
    
    set dataCadastro(dataCadastro) {
        this.#dataCadastro = dataCadastro;
    }

    constructor(id, nome, email, perfilId, ativo, dataCadastro, senha){
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#perfilId = perfilId;
        this.#ativo = ativo;
        this.#dataCadastro = dataCadastro;
        this.#senha = senha;
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "email": this.#email,
            "perfilId": this.#perfilId,
            "senha": this.#senha,
            "ativo": this.#ativo
        }
    }

    async gravar(){
        if(this.#id == 0)//comando insert
        { 
            let sql = "insert into tb_usuarios (usu_nome, usu_email, usu_ativo, perfil_id, usu_datacadastro, usu_senha) values (?, ?, ?, ?, now(), ?)"

            let valores = [this.#nome, this.#email, this.#ativo, this.#perfilId, this.#senha]

            let ok = await banco.ExecutaComandoNonQuery(sql, valores);

            return ok;
        }
        else //comando update
        { 
            let sql = "update tb_usuarios set usu_nome = ?, usu_email = ?, usu_ativo = ?, perfil_id = ?, usu_senha = ? where usu_id = ?"

            let valores = [this.#nome, this.#email, this.#ativo, this.#perfilId, this.#senha, this.#id]

            let ok = await banco.ExecutaComandoNonQuery(sql, valores);

            return ok;
        }
    }

    async obter(id){
        let sql = "select * from tb_usuarios where usu_id = ?";
        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let usuario = new UsuarioModel(rows[0]["usu_id"], rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["perfil_id"], rows[0]["usu_ativo"], rows[0]["usu_datacadastro"], rows[0]["usu_senha"]);

            return usuario;
        }

        return null
    }

    async obterTodos() {

        let sql  = "select * from tb_usuarios";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i<rows.length; i++){
            lista.push(new UsuarioModel(rows[i]["usu_id"],
            rows[i]["usu_nome"], rows[i]["usu_email"], rows[i]["perfil_id"], rows[i]["usu_ativo"], rows[i]["usu_datacadastro"]))
        }

        return lista;
    }

    async excluir(id) {

        let sql = "delete from tb_usuarios where usu_id = ?"

        let valores = [id];

        let ok = await banco.ExecutaComandoNonQuery(sql, valores);

        return ok;
    }

    async autenticar(email, senha) {

        let sql = "select usu_id from tb_usuarios where usu_email = ? and usu_senha = ? and usu_ativo = 'S'";

        let valores = [email, senha];

        let rows = await banco.ExecutaComando(sql, valores);

        return rows.length > 0;
    }

}

module.exports = UsuarioModel;