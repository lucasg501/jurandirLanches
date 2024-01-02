const PerfilModel = require("../models/perfilModel");


class PerfilController {

    async listar(req, res) {
        let perfil = new PerfilModel();
        let lista = await perfil.listarPerfil();
        let listaJson = [];
        lista.forEach(function(value, index) {
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }
}

module.exports = PerfilController;