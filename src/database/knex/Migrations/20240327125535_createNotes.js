// função para criar a migration (criar tabela)
exports.up = knex => knex.schema.createTable('notes', table => {
    // crie uma coluna com o nome id, no tipo integer e auto incrementável
    table.increments('id');
    // crie uma coluna com o nome title, no tipo text
    table.text('title');
    // crie uma coluna com o nome description, no tipo text
    table.text('description');
    // crie uma coluna com o nome user_id, no tipo integer, referenciando a coluna id da tabela users
    // esse comando não permite que a nota seja cria sem um usuário
    table.integer('user_id').references('id').inTable('users');

    // crie uma coluna com o nome created_at, no formato timestamp, com valor padrão chamando uma função knex para pegar a data atual
    table.timestamp('created_at').default(knex.fn.now());
    // crie uma coluna com o nome updated_at, no formato timestamp, com valor padrão chamando uma função knex para pegar a data atual
    table.timestamp('updated_at').default(knex.fn.now());
});


// função para desfazer a migration (deletar a tabela)
exports.down = knex => knex.schema.dropTable('notes');