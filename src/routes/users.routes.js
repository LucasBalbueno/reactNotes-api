// A REPONSABILIDADE DE CONHECER A ROTAS DO USUÁRIO É DESTE ARQUIVO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// importando o controler do usuário do arquivo UsersController.js
const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// inicializando o Router do express
const usersRoutes = Router();

// criando uma instância da classe UsersController para poder usar ela na rota.
const usersController = new UsersController();

// criando uma rota para o método POST
// quando chegarmos na raiz / o usersController irá chamar o método create,
usersRoutes.post('/', usersController.create);
// quando chegarmos na raiz / o usersController irá chamar o método update, mas antes disso, passará pelo middleware
usersRoutes.put('/', ensureAuthenticated, usersController.update);

// exportando as rotas do usuário
module.exports = usersRoutes;