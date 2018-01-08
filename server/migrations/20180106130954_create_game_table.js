exports.up = knex => (
  knex.schema
    .createTable('game', (table) => {
      table.increments().primary()
      table.enum('status', [
        'queue',
        'voting captains',
      ]).notNullable().defaultTo('queue')
    })
    .then(() =>
      knex('game').insert({}))
)

exports.down = knex => (knex.schema.dropTable('game'))
