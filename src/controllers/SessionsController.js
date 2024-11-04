// importação do knex para realizar a conexão com o banco de dados;
const knex = require('../database/knex');
// importação do AppError para tratar os erros;
const AppError = require('../utils/AppError');
// importação do compare do bcryptjs para comparar a senha criptografada do usuário;
const { compare } = require('bcryptjs');
// importação do sign do jsonwebtoken para gerar o token;
const authConfig = require('../configs/auth');
// importação do sign do jsonwebtoken para gerar o token;
const { sign } = require('jsonwebtoken');

class SessionsController {
    // Método para criar a sessão do usuário;
    async create(request, response) {
        // Desestruturação do email e password do corpo da requisição;
        const { email, password } = request.body;

        // Busca o usuário no banco de dados pelo email;
        const user = await knex('users').where({ email }).first();

        // Se o usuário não existir, retorna um erro;
        if (!user) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        // Compara a senha criptografada do usuário com a senha do banco de dados;
        const passwordMatched = await compare(password, user.password);

        // Se a senha não for a mesma, retorna um erro;
        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        // Desestruturação do secret e expiresIn do authConfig.jwt;
        const { secret, expiresIn } = authConfig.jwt;
        
        // Gera o token com o id do usuário (como string) e o tempo de expiração;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });
        
        return response.json({ user, token });
    }
}

module.exports = SessionsController;