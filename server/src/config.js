import _ from 'lodash'

const {
  NODE_ENV,
  APP_ENV,
  STEAM_API_KEY,
  DB_URL,
} = process.env

const appEnvConfig = {
  development: {
    domain: 'http://localhost:8080',
    dbUrl: 'postgres://project_rally_point:password@localhost:8081/project_rally_point',
  },
  'unit-test': {
    dbUrl: 'postgres://project_rally_point:password@localhost:8082/project_rally_point',
    pruneSessionInterval: false,
  },
}

const defaults = {
  pruneSessionInterval: 60,
}

export default _.defaults({
  nodeEnv: NODE_ENV,
  appEnv: APP_ENV,
  steamApiKey: STEAM_API_KEY,
  dbUrl: DB_URL,
}, appEnvConfig[APP_ENV], defaults)
