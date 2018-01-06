import http from 'http'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import api from './routes/api'
import passport from './passport'
import sessionStore from './session-store'
import config from './config'

const app = express()

app.use(cookieParser())
app.use(session({
  key: config.session.key,
  secret: config.session.secret,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)
app.get('/', (req, res) => res.sendFile('client/html/index.html', { root: path.resolve(__dirname, '../../') }))
app.get('/client.js', (req, res) => res.sendFile('client/dist/index.js', { root: path.resolve(__dirname, '../../') }))
app.use('/img', express.static(path.join(__dirname, '../../client/img')))

export default http.createServer(app)
