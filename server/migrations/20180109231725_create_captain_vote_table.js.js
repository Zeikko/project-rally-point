exports.up = knex => (
  knex.schema
    .createTable('captainVote', (table) => {
      table.increments().primary()
      table.integer('gameId').notNullable()
      table.integer('voterId').notNullable()
      table.integer('votedId').notNullable()
    })
    .then(() =>
      knex.raw(`
        ALTER TABLE "captainVote"
        ADD CONSTRAINT unique_voter
        UNIQUE("gameId", "voterId") DEFERRABLE INITIALLY DEFERRED;
      `))
)

exports.down = knex => (knex.schema.dropTable('captainVote'))
