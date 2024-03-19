// A REPONSABILIDADE DE CONHECER A ROTAS DO USUÁRIO É DESTE ARQUIVO

// importando Router do express
// A função Router é usada para criar um "mini-aplicativo"
const { Router } = require('express');

// importando o controler do usuário do arquivo UsersController.js
const UsersController = require('../controllers/UsersController');

// inicializando o Router do express
const usersRoutes = Router();

// criando um middleware
// no middleware temos acesso a requisição, ao objeto resposta e também o seu destino (para onde o middleware deve ir depois)
function myMiddleware (request, response, next) {
    // avisando que passou pelo middleware
    console.log('Você passou pelo Middleware');

    // autenticação para verificar se o usuário é administrador. Se não for, return encerrra a execução do middleware
    if (!request.body.isAdm) {
        return response.status(401).json({ error: 'Usuário não autorizado!' });
    }

    // se passou pela autenticação, irá para o próximo middleware
    next();
}






// criando uma instância da classe UsersController para poder usar ela na rota.
const usersController = new UsersController();

// criando uma rota para o método POST
// quando chegarmos na raiz / o usersController irá chamar o método create, mas antes disso, passará pelo middleware (que agora possui acesso a requisição)
usersRoutes.post('/', myMiddleware, usersController.create);

// exportando as rotas do usuário
module.exports = usersRoutes;