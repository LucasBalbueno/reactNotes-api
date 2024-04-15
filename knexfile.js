// importando o path do node para manipular caminhos e evitar erros
const path = require('path');

module.exports = {
  development: {
    // estamos dizendo qual a conexão do banco de dados
    client: 'sqlite3',
    connection: {
      // em que lugar está o arquivo do banco de dados (usando path)
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    migrations: {
      // em que lugar estão as migrations
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true,
  }
};
