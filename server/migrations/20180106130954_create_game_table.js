exports.up = knex => (
  knex.schema
    .createTable('game', (table) => {
      table.increments().primary()
      table.enum('status', [
        'queue',
        'started',
      ]).notNullable().defaultTo('queue')
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    })
    .then(() =>
      knex('game').insert({}))
)

exports.down = knex => (knex.schema.dropTable('game'))
