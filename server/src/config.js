import _ from 'lodash'

const {
  NODE_ENV,
  APP_ENV,
} = process.env

const appEnvConfig = {
  development: {
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
}, appEnvConfig[APP_ENV], defaults)
