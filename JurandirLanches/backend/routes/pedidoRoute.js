const express = require('express');
const PedidoController = require('../controllers/pedidoController');
const Autorizacao = require('../middlewares/autorizacao');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new PedidoController();
router.get('/pao/listar',
(req, res) => {
    // #swagger.tags = ['Pedido']
    ctrl.listarPao(req, res);
})

router.get('/queijo/listar',
(req, res) => {
    // #swagger.tags = ['Pedido']
    ctrl.listarQueijo(req, res);
})

router.get('/hamburguer/listar',
(req, res) => {
    // #swagger.tags = ['Pedido']
    ctrl.listarHamburguer(req, res);
})

router.get('/acompanhamento/listar',
(req, res) => {
    // #swagger.tags = ['Pedido']
    ctrl.listarAcompanhamento(req,res);
})


router.get('/listar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Pedido']
        /* #swagger.security = [{
            "apiKeyAuth": ['Juralanches']
    }] */
    ctrl.listarPedidos(req, res);
})

router.post('/gravar', (req, res) => {
    // #swagger.tags = ['Pedido']
    ctrl.gravarPedido(req, res);
})



module.exports = router;
