const UsuarioModel = require("../models/usuariosModel");


class LoginController {

    async autenticar(req, res) {
        if(req.body.email != undefined && req.body.senha != undefined) {
            let usuario = new UsuarioModel();
            let autenticou = await usuario.autenticar(req.body.email, req.body.senha)

            if(autenticou) {
                res.cookie('cookieAuth', 'Juralanches');
                res.status(200).json({msg: 'Usuário autenticado!'});
            }
            else{
                res.status(404).json({msg: 'Usuário não encontrado'})
            }
        }
        else{
            res.status(400).json({msg: 'Requisição inválida'});
        }
    }
}

module.exports = LoginController;