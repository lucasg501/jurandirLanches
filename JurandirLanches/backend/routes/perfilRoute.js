const express = require('express');
const Autorizacao = require('../middlewares/autorizacao');
const PerfilController = require('../controllers/perfilController');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new PerfilController();
router.get('/listar', auth.validarToken, 
(req, res) => {
    // #swagger.tags = ['Perfil']
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
})


module.exports = router;
