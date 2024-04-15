// importando as configurações do knex
const config = require ('../../../knexfile');

// importando o knex
const knex = require ('knex');

// dizendo para o knex quais as configurações que vamos usar
const connection = knex(config.development);

// exportando a conexão
module.exports = connection;