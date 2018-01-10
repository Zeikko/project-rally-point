exports.up = knex => (
  knex.schema
    .createTable('game', (table) => {
      table.increments().primary()
      table.enum('status', [
        'QUEUE',
        'VOTE_CAPTAINS',
      ]).notNullable().defaultTo('QUEUE')
      table.integer('maxPlayers').notNullable().defaultTo(48)
    })
    .then(() =>
      knex('game').insert({}))
)

exports.down = knex => (knex.schema.dropTable('game'))
