// importando a conexão com o banco de dados
const sqliteConnection = require('../../sqlite');

// importando a função para criar as tabelas (de usuários)
const createUsers = require('./createUsers');

// função assíncrona para rodar as migrations
async function migrationsRun() {
    // schemas se refere as automatizações que o banco de dados terá. Até agora temos apenas uma, mas conforme a aplicação crescer, teremos mais
    const schemas = [
        createUsers
    ].join('') // o join serve para juntar todos os elementos do array em uma string

    // chamando a função sqliteConnection para se conectar com o banco de dados
    // dessa forma também automatizamos o processo de executar a função que faz conexão com o banco de dados
    sqliteConnection()
    // usar uma promisse para executar as schemas (as migrations/tabelas)
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun;
