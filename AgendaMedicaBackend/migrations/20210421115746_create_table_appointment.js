
exports.up = function(knex) {
    return knex.schema.createTable('appointment', table => {
        table.increments('appointmentId').primary()
        table.string('apptType').notNull()
        table.string('shift').notNull()
        table.string('room').notNull()
        table.string('situation').notNull()
        table.datetime('estimatedAt').notNull()
        table.datetime('doneAt')
        table.datetime('createdAt').defaultTo(knex.fn.now())
        table.datetime('updatedAt').defaultTo(knex.fn.now())
        table.integer('userId').references('userId').inTable('users').notNull()
        table.integer('patientId').references('patientId').inTable('patient').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('appointment')
};
