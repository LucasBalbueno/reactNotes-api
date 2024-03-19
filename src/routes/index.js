// ARQUIVO RESPONSAVEL POR UNIR TODAS AS ROTAS DA APLICAÇÃO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// inicializando o Router do express
const routes = Router();

// importando o arquivo de rotas do usuário
const usersRouter = require('./users.routes');

// toda a vez que alguem acessar a rota /users, o express irá redirecionar para o arquivo users.routes.js que é o grupo de rotas do usuário
routes.use('/users', usersRouter);

// exportando as rotas da aplicação, os grupos de rotas
module.exports = routes;