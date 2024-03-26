// importando a função que criptografa a senha (o hash) e a função que compara a senha criptografada com a senha a ser atualizada (compare)
const { hash, compare } = require('bcryptjs');

// importando a classe de tratamento de erro
const AppError = require ('../utils/AppError.js');

// importando a conexão com o banco de dados
const sqliteConnection = require('../database/sqlite')

// criando a classe UsersController para responder as requisições
class UsersController {
    // função de criação de usuário
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

    // função de atualização de usuário
    async update (request, response) {
        // pegando o nome e email e senhas da requisição
        const { name, email, password, old_password } = request.body;

        // pegando o id do usuário do parâmetro da rota
        const { id } = request.params;

        // criando a conexão com o banco de dados
        const database = await sqliteConnection();

        // usando um script SQL para verificar o usuário que corresponde ao id passado pela requisição
        const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

        // se o usuário não existir, retornamos um erro
        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        // usando um script SQL para verificar se o usuário está mudando o email também
        const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

        // verificando se o email que estamos tentando utilizar já está em uso por outra pessoa
        // se o email já esta em uso e o id do usuário que está usando é diferente do id do usuário que está tentando atualizar, retornamos um erro
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError('Este e-mail já está em uso');
        }

        //atualizando o novo nome e email do usuário
        // usando o operador "??", se o nome ou email for null ou undefined (não for informado), ele irá manter o nome ou email antigo (user.name ou user.email) que está no banco de dados
        user.name = name ?? user.name;
        user.email = email ?? user.email;

        // criando uma condição para garantir que o usuário informe a senha anterior para atualizar a nova senha
        if (password && !old_password) {
            throw new AppError('Para atualizar a senha, você precisa informar a senha antiga', 401);
        }

        // criando uma condição se o usuário informou a senha antiga e a nova senha
        if (password && old_password) {
            // não podemos comparar a senha antiga com a nova com "=" pois a senha antiga está criptografada no bd
            // para comparar senha criptografadas devemos usar a função compare da dependencia bcryptjs
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError('Senha antiga incorreta', 401);
            }

            user.password = await hash(password, 8);
        }

        // executando um script SQL para atualizar o nome, email e data de atualização do usuário onde o id for igual ao id passado na requisição
        await database.run(`UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, id]);

        // retornando uma resposta com um json vazio
        return response.json();
    } 
}

// exportando a classe UsersController para ser usada em outros arquivos
module.exports = UsersController;