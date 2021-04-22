
exports.up = function(knex) {
    return knex.schema.createTable('doctor', table => {
        table.increments('doctorId').primary()
        table.integer('medicalRegistry').notNull().unique()
        table.datetime('createdAt').defaultTo(knex.fn.now())
        table.datetime('updatedAt').defaultTo(knex.fn.now())
        table.integer('userId').references('userId').inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('doctor')
};
