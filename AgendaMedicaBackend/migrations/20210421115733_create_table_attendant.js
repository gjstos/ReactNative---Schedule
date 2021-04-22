
exports.up = function(knex) {
    return knex.schema.createTable('attendant', table => {
        table.increments('attendantId').primary()
        table.integer('attendantRegistry').notNull().unique()
        table.datetime('createdAt').defaultTo(knex.fn.now())
        table.datetime('updatedAt').defaultTo(knex.fn.now())
        table.integer('userId').references('userId').inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('attendant')
};
