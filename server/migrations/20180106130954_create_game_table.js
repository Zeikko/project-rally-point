exports.up = knex => (
  knex.schema
    .createTable('game', (table) => {
      table.increments().primary()
      table.enum('status', [
        'QUEUE',
        'VOTE_CAPTAINS',
        'SQUAD_LEADER_PICK',
        'PLAYING',
        'SQUAD_MEMBER_PICK',
      ]).notNullable().defaultTo('QUEUE')
      table.integer('maxPlayers').notNullable().defaultTo(48)
      table.integer('teamWithTurnToPick')
    })
    .then(() =>
      knex('game').insert({}))
)

exports.down = knex => (knex.schema.dropTable('game'))
