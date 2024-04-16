// importando o knex para fazer o query builder
const { request } = require('express');
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
        return response.json();
    }

    // função para mostrar as notas
    async show(request, response) {
        // pegando o id da nota passado como parâmetro da rota
        const { id } = request.params;

        // pegando a nota no banco de dados onde o id for igual ao id passado como parâmetro (pegaremos apenas a primeira)
        const note = await knex('notes').where({ id }).first();
        // pegando as tags no banco de dados onde o note_id for igual ao id passado como parâmetro e ordenando pelo nome
        const tags = await knex('tags').where({ note_id: id }).orderBy('name');
        // pegando os links no banco de dados onde o note_id for igual ao id passado como parâmetro
        const links = await knex('links').where({ note_id: id });

        // retornando a resposta da requisição em formato JSON
        // devemos colocar me formato de objeto para que possamos passar mais de um parâmetro
        return response.json({
            ...note,
            tags,
            links
        });
    }

    // função para deletar as notas
    async delete(request, response) {
        // pegando o id da nota passado como parâmetro da rota
        const { id } = request.params;

        // deletando a nota no banco de dados onde o id for igual ao id passado como parâmetro
        await knex('notes').where({ id }).delete();

        // retornando a resposta da requisição em formato JSON
        return response.json();
    }

    // função para listar as notas
    async index(request, response) {
        // pegando o id do usuário passado como query da rota (?user_id=1)
        const { title, user_id, tags } = request.query;

        let notes;

        if (tags){
            // passando as tags para um array
            const filterTags = tags.split(',').map(tag => tag.trim());
            

            // EXPLICAÇÃO EM ORDEM DE EXECUÇÃO
            // Inicia uma consulta ao banco de dados na tabela 'tags'
            // Especifica as colunas que serão retornadas na consulta
            // restringe os resultados a linhas onde o 'user_id' na tabela 'notes' é igual ao user_id fornecido.
            // Usa o operador Like. restringe os resultados a linhas onde o 'title' na tabela 'notes' contém o valor de title.
            // os resultados a linhas onde o 'name' está dentro do array filterTags. O filtro whereIn é usado quando você quer filtrar resultados com base em uma array, diferente do where que é usado para filtrar resultados com base em um único valor
            // Realiza um INNER JOIN com a tabela 'notes', onde 'notes.id' é igual a 'tags.note_id'. Isso combina linhas de ambas as tabelas onde o 'id' na tabela 'notes' é igual ao 'note_id' na tabela 'tags'.
            // Ordena os resultados da consulta em ordem alfabetica pelo 'title' na tabela 'notes
            notes = await knex('tags')
            .select([
                'notes.id',
                'notes.title',
                'notes.user_id',
            ])
            .where('notes.user_id', user_id)
            .whereLike('notes.title', `%${title}%`)
            .whereIn('name', filterTags)
            .innerJoin('notes', 'notes.id', 'tags.note_id')
            .orderBy('notes.title')
            
        } else {
            // pegando as notas no banco de dados onde o user_id for igual ao user_id passado como query na rota
            const notes = await knex('notes')
            .where({ user_id })
            .whereLike('title', `%${title}%`)
            .orderBy('title');   
        }

        // retornando a resposta da requisição em formato JSON
        return response.json(notes);
    }
}

module.exports = NotesController;