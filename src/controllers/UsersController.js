// importando a classe de tratamento de erro
const AppError = require ('../utils/AppError.js');

// criando a classe UsersController para responder as requisições
class UsersController {
    create (request, response) {
        const { name, email, password } = request.body;

        // se não tiver nome
        if (!name) {
            // lançando um erro
            throw new AppError('Nome é obrigatório!');
        }

        response.json({ name, email, password });
    }
}

// exportando a classe UsersController para ser usada em outros arquivos
module.exports = UsersController;