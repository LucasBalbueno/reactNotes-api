// importando o express. Como se tivessemos pegando toda a pasta do express e armazenando na variável express
const express = require('express');

// importando o arquivo principal que une as rotas de usuários da aplicação
// por padrão, quando não é informado o arquivo, o node procura pelo arquivo chamado index.js
const routes = require("./routes");

// inicializando o express
const app = express();

// dizendo para o express que ele irá trabalhar com json (PARA O MÉTODO POST)
app.use(express.json());

// dizendo para o express que ele irá trabalhar com as rotas do arquivo index.js
app.use(routes);

// definindo o nº da porta/endereço que o express irá observar
const port = 3333;
// criando uma função para o app oberservar nessa porta/endereço
app.listen(port, () => console.log(`Server is running on port ${port}`));