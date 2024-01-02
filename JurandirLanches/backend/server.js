const express = require('express');
const usuarioRota = require('./routes/usuarioRoute');
const perfilRota = require('./routes/perfilRoute');
const loginRota = require('./routes/loginRoute');
const pedidoRota = require('./routes/pedidoRoute');
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use('/usuario', usuarioRota);
app.use('/perfil', perfilRota);
app.use('/login', loginRota);
app.use('/pedido', pedidoRota);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.listen('4000', function() {
    console.log('backend em execução');
})