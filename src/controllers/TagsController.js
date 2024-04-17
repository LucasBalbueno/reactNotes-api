// importando o knex para fazer o query builder
const knex = require('../database/knex');

// criando class TagsController para responder as requisições com regras de negócios
class TagsController {
    // função para mostrar/listar as tags
    async index(request, response){
        // pegando o id do usuário passado como parâmetro da rota
        const { user_id } = request.params;

        // pegando as tags no banco de dados onde o user_id for igual ao id passado como parâmetro
        const tags = await knex('tags')
        .where({ user_id });

        return response.json(tags);
    }
}

// exportando a class TagsController
module.exports = TagsController;