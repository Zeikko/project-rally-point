import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'
import db from './db'
import config from './config'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db('user')
    .first('*')
    .where({
      id,
    })
    .then(user => done(null, user))
    .catch(err => done(err))
})

passport.use(new SteamStrategy({
  returnURL: 'http://localhost:8080/api/auth/callback',
  realm: 'http://localhost:8080',
  apiKey: config.steamApiKey,
}, (identifier, profile, done) => {
  db('user')
    .first('*')
    .where({
      steamId: profile._json.steamid, // eslint-disable-line no-underscore-dangle
    })
    .then((user) => {
      if (user) {
        return user
      }
      return db('user')
        .insert({
          steamId: profile._json.steamid, // eslint-disable-line no-underscore-dangle
          displayName: profile._json.personaname, // eslint-disable-line no-underscore-dangle
          profileUrl: profile._json.profileurl, // eslint-disable-line no-underscore-dangle
          smallAvatarUrl: profile._json.avatar, // eslint-disable-line no-underscore-dangle
          mediumAvatarUrl: profile._json.avatarmedium, // eslint-disable-line no-underscore-dangle
          fullAvatarUrl: profile._json.avatarfull, // eslint-disable-line no-underscore-dangle
          primaryClanId: profile._json.primaryclanid, // eslint-disable-line no-underscore-dangle
          country: profile._json.loccountrycode, // eslint-disable-line no-underscore-dangle
        })
        .returning('*')
        .then(users => users[0])
    })
    .then(user => done(null, user))
    .catch(err => done(err))
}))

export default passport
