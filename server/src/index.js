import express from 'express'
import path from 'path'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import api from './routes/api'
import passport from './passport'
import config from './config'

const PgSession = connectPgSimple(session)
const app = express()

app.use(session({
  secret: 'secret',
  store: new PgSession({
    conString: config.dbUrl,
  }),
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)
app.get('/', (req, res) => res.sendFile('client/html/index.html', { root: path.resolve(__dirname, '../../') }))
app.get('/client.js', (req, res) => res.sendFile('client/dist/index.js', { root: path.resolve(__dirname, '../../') }))
app.use('/img', express.static(path.join(__dirname, '../../client/img')))

app.listen(8080, () => console.log('Project Rally Point listening on port 8080!')) // eslint-disable-line no-console
