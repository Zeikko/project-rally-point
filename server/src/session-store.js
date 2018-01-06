import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import config from './config'

const PgSession = connectPgSimple(session)

export default new PgSession({
  conString: config.dbUrl,
  pruneSessionInterval: config.pruneSessionInterval,
})
