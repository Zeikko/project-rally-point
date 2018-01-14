exports.up = knex => (
  knex.schema
    .createTable('player', (table) => {
      table.increments().primary()
      table.integer('gameId').notNullable()
      table.integer('userId').notNullable()
      table.integer('team')
      table.integer('squad')
      table.enum('role', [
        'NONE',
        'CAPTAIN',
        'SQUAD_LEADER',
        'SQUAD_MEMBER',
      ]).defaultTo('NONE')
    })
    .then(() =>
      knex.raw(`
        ALTER TABLE player
        ADD CONSTRAINT unique_player
        UNIQUE("gameId", "userId") DEFERRABLE INITIALLY DEFERRED;
      `))
)

exports.down = knex => (knex.schema.dropTable('player'))
