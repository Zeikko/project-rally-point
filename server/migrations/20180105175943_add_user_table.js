exports.up = knex => (
  knex.schema
    .createTable('user', (table) => {
      table.increments().primary()
      table.string('steamId', 32).notNullable()
      table.string('displayName', 124).notNullable()
      table.string('profileUrl', 512).notNullable()
      table.string('smallAvatarUrl', 512)
      table.string('mediumAvatarUrl', 512)
      table.string('fullAvatarUrl', 512)
      table.string('primaryClanId', 32)
      table.string('country', 32)
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    })
)

exports.down = knex => (knex.schema.dropTable('"user"'))
