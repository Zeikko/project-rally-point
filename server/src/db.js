import knex from 'knex'
import config from './config'

export default knex({
  client: 'postgres',
  connection: config.dbUrl,
  useNullAsDefault: true,
})
