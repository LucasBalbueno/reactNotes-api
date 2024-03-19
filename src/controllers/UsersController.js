// croamdp a classe UsersController para responder as requisições
class UsersController {
    create (request, response) {
        const { name, email, password } = request.body;

        response.json({ name, email, password });
    }
}

// exportando a classe UsersController para ser usada em outros arquivos
module.exports = UsersController;