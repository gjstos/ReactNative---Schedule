
exports.up = function(knex) {
    return knex.schema.createTable('patient', table => {
        table.increments('patientId').primary()
        table.string('name').notNull()
        table.string('regPatient').notNull()
        table.datetime('arriveHour').defaultTo(knex.fn.now())
        table.datetime('createdAt').defaultTo(knex.fn.now())
        table.datetime('updatedAt').defaultTo(knex.fn.now())
        table.integer('userId').references('userId').inTable('users').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('patient')
};
