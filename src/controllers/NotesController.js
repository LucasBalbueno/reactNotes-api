// importando o knex para fazer o query builder
const knex = require('../database/knex');

// criando class NotesController para responder as requisições com regras de negócios
class NotesController {
    // função de criação de nota
    async create(request, response) {
        // pegando os dados do corpo da requisição
        const { title, description, tags, links } = request.body;

        // pegando o id do usuário passado como parâmetro da rota
        const { user_id } = request.params;

        // inserindo a nova nota no banco de dados, porém é retornado o id em formato de array, por isso a desestruturação
        const [note_id] = await knex('notes').insert({
            title,
            description,
            user_id
        });

        // map percorre cada link que temos e retorna um objeto com o id da nota e o link
        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        // inserindo os links no banco de dados na tabela links
        await knex('links').insert(linksInsert);

        // map percorre cada tag que temos e retorna um objeto com o id da nota e a tag
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        // inserindo as tags no banco de dados na tabela tags
        await knex('tags').insert(tagsInsert);

        // retornando a resposta da requisição em formato JSON
        response.json;
    }
}

module.exports = NotesController;