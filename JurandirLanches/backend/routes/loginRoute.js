const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();
let ctrl = new LoginController();
router.post('/autenticar', (req, res) => {
    //#swagger.tags = ['Login']
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/login"
                    }  
                }
            }
        } 
    */
    ctrl.autenticar(req, res);
})

module.exports = router;