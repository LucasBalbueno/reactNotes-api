// A REPONSABILIDADE DE CONHECER A ROTAS DO USUÁRIO É DESTE ARQUIVO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');
// importando o multer para poder fazer o upload de arquivos no servidor.
const multer = require('multer');
const uploadConfig = require('../configs/upload');

// importando o controler do usuário do arquivo UsersController.js
const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// inicializando o Router do express
const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

// criando uma instância da classe UsersController para poder usar ela na rota.
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// criando uma rota para o método POST
// quando chegarmos na raiz / o usersController irá chamar o método create,
usersRoutes.post('/', usersController.create);
// quando chegarmos na raiz / o usersController irá chamar o método update, mas antes disso, passará pelo middleware
usersRoutes.put('/', ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

// exportando as rotas do usuário
module.exports = usersRoutes;