import supertest from 'supertest'
import passportStub from 'passport-stub'
import { matchBodyToSnapshot } from '../../../test/snapshot'
import app from '../../../app'
import db from '../../../db'
import normalUserFixture from '../../../../../fixtures/normal-user.json'

passportStub.install(app)
const request = supertest(app)

describe('/api/auth', () => {
  beforeEach(() => db('user').insert([normalUserFixture]))


  afterEach((done) => {
    passportStub.logout()
    done()
  })

  describe('/login GET', () => {
    it('redirect user', () => request
      .get('/api/auth/login')
      .expect(302))
  })

  describe('/logout POST', () => {
    it('does nothing for non logged in user', () => request
      .post('/api/auth/logout')
      .expect(200)
      .then(matchBodyToSnapshot))

    it('logs user out', () => request
      .post('/api/auth/logout')
      .expect(200)
      .then(matchBodyToSnapshot))
  })

  describe('/loggedin GET', () => {
    it('returns null when not logged in', () => request
      .get('/api/auth/loggedin')
      .expect(200)
      .then(response => expect(response.body).toBeNull()))

    it('returns user when logged in', () => {
      passportStub.login(normalUserFixture.id)
      return request
        .get('/api/auth/loggedin')
        .expect(200)
        .then(response => expect(response.body).toEqual(normalUserFixture))
    })
  })
})

