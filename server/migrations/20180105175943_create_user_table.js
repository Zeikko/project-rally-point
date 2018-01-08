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
      table.string('country', 2)
      table.enum('role', [
        'user',
        'admin',
        'simulated user',
      ]).notNullable().defaultTo('user')
    })
    .then(createSimulatedUsers(knex))
)

exports.down = knex => (knex.schema.dropTable('user'))

function createSimulatedUsers(knex) {
  let users = []
  for (let id = 1; id <= 48; id += 1) {
    users = [...users, knex('user')
      .insert({
        steamId: id,
        displayName: `Test user ${id}`,
        profileUrl: `http://steamcommunity.com/id/${id}`,
        role: 'simulated user',
        country: 'C:',
        smallAvatarUrl: `https://www.gravatar.com/avatar/${id}?s=32&d=identicon&r=PG`,
      })
      .returning('id'),
    ]
  }
  return Promise.all(users)
}
