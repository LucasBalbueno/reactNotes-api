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
    // o poll serve para criar configurações para serem executadas toda a vez que estabelecer conexão com o banco de dados
    pool: {
      // 'PRAGMA foreign_keys = ON' serve para habilitar o delete em cascata
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    migrations: {
      // em que lugar estão as migrations
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true,
  }
};
