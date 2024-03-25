// importando a função que criptografa a senha (o hash)
const { hash } = require('bcryptjs');

// importando a classe de tratamento de erro
const AppError = require ('../utils/AppError.js');

// importando a conexão com o banco de dados
const sqliteConnection = require('../database/sqlite')

// criando a classe UsersController para responder as requisições
class UsersController {
    async create (request, response) {
        const { name, email, password } = request.body;

        const database = await sqliteConnection();

        // usando um script SQL para verificar se o usuário já existe
        // o script retorna tudo de usuário onde o email é igual ao email passado na requisição
        // Para inserir variaveis no script SQL, usamos o (?) e depois , [variavel1]
        const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        if (checkUserExists) {
            throw new AppError('Este e-mail já está em uso');
        }

        // executando a função de hash para criptografar a senha
        // para hash, passamos a senha e o número de rounds (quantidade de vezes que a senha será criptografada), ou seja, a complexidade da senha
        const hashedPassword = await hash(password, 8)

        // usando um script SQL para inserir o registro do novo usuário no banco de dados
        await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        return response.status(201).json()
    }
}

// exportando a classe UsersController para ser usada em outros arquivos
module.exports = UsersController;