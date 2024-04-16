// A REPONSABILIDADE DE CONHECER A ROTAS DO USUÁRIO É DESTE ARQUIVO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// importando o controler de notas do arquivo NotesController.js
const NotesController = require('../controllers/NotesController');

// inicializando o Router do express
const notesRoutes = Router();

// criando uma instância da classe NotesController para poder usar ela na rota.
const notesController = new NotesController();

// criando uma rota para o método POST
// quando chegarmos na raiz / o usersController irá chamar o método create, mas antes disso, passará pelo middleware (que agora possui acesso a requisição)
notesRoutes.post('/:user_id', notesController.create);

// criando uma rota para o método GET
notesRoutes.get('/:id', notesController.show);

// criando uma rota para o método DELETE
notesRoutes.delete('/:id', notesController.delete);

// criando uma rota para o método GET (listas notas)
notesRoutes.get('/', notesController.index);

// exportando as rotas do usuário
module.exports = notesRoutes;