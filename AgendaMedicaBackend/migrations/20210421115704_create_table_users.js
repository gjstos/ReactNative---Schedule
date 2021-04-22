
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('userId').primary()
        table.string('name').notNull()
        table.string('password').notNull()
        table.datetime('createdAt').defaultTo(knex.fn.now())
        table.datetime('updatedAt').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
