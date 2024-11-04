// ARQUIVO RESPONSAVEL POR UNIR TODAS AS ROTAS DA APLICAÇÃO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// inicializando o Router do express
const routes = Router();

// importando o arquivo de rotas do usuário
const usersRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');
const sessionsRouter = require('./sessions.routes');

// toda a vez que alguem acessar a rota /users, o express irá redirecionar para o arquivo users.routes.js que é o grupo de rotas do usuário
routes.use('/users', usersRoutes);

// toda a vez que alguem acessar a rota /notes, o express irá redirecionar para o arquivo notes.routes.js que é o grupo de rotas de notas
routes.use('/notes', notesRoutes);

// toda a vez que alguem acessar a rota /tags, o express irá redirecionar para o arquivo tags.routes.js que é o grupo de rotas de notas
routes.use('/tags', tagsRoutes);

// toda a vez que alguem acessar a rota /sessionsRouter, o express irá redirecionar para o arquivo sessions.routes.js que é o grupo de rotas de notas
routes.use('/sessions', sessionsRouter);

// exportando as rotas da aplicação, os grupos de rotas
module.exports = routes;