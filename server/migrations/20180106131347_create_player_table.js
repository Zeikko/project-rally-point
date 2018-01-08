exports.up = knex => (
  knex.schema
    .createTable('player', (table) => {
      table.increments().primary()
      table.integer('gameId').notNullable()
      table.integer('userId').notNullable()
    })
    .then(() =>
      knex.raw(`
        ALTER TABLE player
        ADD CONSTRAINT unique_player
        UNIQUE("gameId", "userId") DEFERRABLE INITIALLY DEFERRED;
      `))
)

exports.down = knex => (knex.schema.dropTable('player'))
