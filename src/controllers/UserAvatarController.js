// importando o knex para poder fazer as operações no banco de dados
const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class UserAvatarController {
    // método para atualizar o avatar do usuário;
    async update (request, response) {
        // pegando o id do usuário que está logado no sistema através do token JWT/
        const user_id = request.user.id;
        // pegando o nome do arquivo que foi enviado no corpo da requisição/
        const avatarFilename = request.file.filename;

        // criando uma instância da classe DiskStorage/
        const diskStorage = new DiskStorage();

        // buscando o usuário no banco de dados pelo id que foi passado no token JWT e pegando o primeiro resultado que vier do banco de dados;
        const user = await knex('users').where({ id: user_id }).first();

        // se o usuário não existir, retornar um erro 401/
        if (!user) {
            throw new AppError('Only authorized users can change the avatar', 401);
        }

        // se o usuário já tiver um avatar, deletar o avatar antigo/
        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        // salvar o novo avatar no diso e pegar o nome do arquivo que foi salvo no disco para poder atualizar o avatar do usuário no banco de dados
        const filename = await diskStorage.saveFile(avatarFilename);
        // atualizar o avatar do usuário no banco de dados com o novo avatar que foi salvo no disco
        user.avatar = filename;

        // atualizar o usuário no banco de dados com o novo avatar e retornar o usuário atualizado
        await knex('users').update(user).where({ id: user_id });

        return response.json(user);
    }
}

module.exports = UserAvatarController;