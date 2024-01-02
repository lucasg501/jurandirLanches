const UsuarioModel = require("../models/usuariosModel");

class UsuarioController {

    async obter(req, res) {
        if(req.params.id != undefined) {
            let usuario = new UsuarioModel();
            usuario = await usuario.obter(req.params.id);
            if(usuario == null) {
                res.status(404).json({msg: "Usuário não encontrado!"})
            }
            else {
                res.status(200).json(usuario.toJSON());
            }
            
        }
        else {
            res.status(400).json({msg: "Parâmetro inválido"});
        }
    }

    async listar(req, res) {
        let usuModel = new UsuarioModel();
        let lista = await usuModel.obterTodos();
        let listaRetorno = [];

        for(let i = 0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON())
        }

        res.status(200).json(listaRetorno);
    }

    async excluir(req, res) {
        try{
            if(req.params.id != null) {
                let usuarioModel = new UsuarioModel();
                let ok = await usuarioModel.excluir(req.params.id);

                if(ok) {
                    res.status(200).json({msg: "Usuário excluído com sucesso!"})
                }
                else{
                    res.status(500).json({msg: "Erro ao excluir usuário"});
                }
            }
            else{
                res.status(400).json({msg: 'Parâmetro inválido'})
            }
        }
        catch(e){
            res.status(500).json({msg: e.message})
        }

    }

    async alterar(req, res){
        if(Object.keys(req.body).length == 6){

            let usuarioModel = new UsuarioModel();

            usuarioModel.id = req.body.id;
            usuarioModel.nome = req.body.nome;
            usuarioModel.ativo = req.body.ativo;
            usuarioModel.email = req.body.email;
            usuarioModel.perfilId = req.body.perfilId;           
            usuarioModel.senha = req.body.senha;
            let ok = await usuarioModel.gravar()
            if(ok)
                res.status(200).json({msg: "Usuário alterado!"})
            else
                res.status(500).json({msg: "Erro ao alterar usuário"})
        }
        else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    criar(req, res) {
        if(Object.keys(req.body).length == 5) {
            let usuarioModel = new UsuarioModel();

            usuarioModel.id = 0;
            usuarioModel.nome = req.body.nome;
            usuarioModel.ativo = req.body.ativo;
            usuarioModel.email = req.body.email;
            usuarioModel.perfilId = req.body.perfilId;           
            usuarioModel.senha = req.body.senha;
            let ok = usuarioModel.gravar()
            if(ok)
                res.status(200).json({msg: "Usuário adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar usuário"})
        }
        else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

}

module.exports = UsuarioController;