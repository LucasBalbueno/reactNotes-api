// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// importando o controler de notas do arquivo TagsController.js
const TagsController = require('../controllers/TagsController');

// inicializando o Router do express
const tagsRoutes = Router();

// criando uma instância da classe TagsController para poder usar ela na rota.
const tagsController = new TagsController();

// criando uma rota para o método GET (listas notas)
tagsRoutes.get('/:user_id', tagsController.index);

// exportando as rotas do usuário
module.exports = tagsRoutes;