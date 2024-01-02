const UsuarioModel = require("./models/usuariosModel.js");

const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"})

const doc = {
    info: {
        title: 'PFS 2 - API',
        description: 'API da disciplina de PFS 2'
      },
    host: 'localhost:4000',
    securityDefinitions: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header', // can be 'header', 'query' or 'cookie'
        name: 'chaveapi', // name of the header, query parameter or cookie
        description: 'Chave de autorização da nossa API'
      },
    },
    components: {
        schemas: {
            usuario: new UsuarioModel(999, "Usuario teste", 'teste@teste.com', 1, 'S', '', '123').toJSON(),
            login: {"email": "teste@teste.com", "senha": 123}
        }
    }
  };

let outputJson = "./outputSwagger.json";
let endpoints = ["./server.js"]

swaggerAutogen(outputJson, endpoints, doc)
.then(r=> {
    require('./server.js')
});