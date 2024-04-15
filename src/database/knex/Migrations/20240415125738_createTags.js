// função para criar a migration (criar tabela)
exports.up = knex => knex.schema.createTable('tags', table => {
    table.increments('id');

    // ciar um dado inteiro chamado note_id que referencia a coluna id da tabela notes
    // onDelete('CASCADE') é um método que define que, caso o usuário ou a nota seja deletado, todas as notas associadas a ele também serão deletadas
    table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE');

    // ciar um dado inteiro chamado user_id que referencia a coluna id da tabela users
    table.integer('user_id').references('id').inTable('users');

        // notNullable() é um método que define que o campo não pode ser nulo
        table.text('name').notNullable();
});


// função para desfazer a migration (deletar a tabela)
exports.down = knex => knex.schema.dropTable('tags');