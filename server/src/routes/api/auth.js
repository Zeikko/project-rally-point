import express from 'express'
import passport from '../../passport'

const router = express.Router()

router.get('/login', passport.authenticate('steam', { failureRedirect: '/login', session: true }), () => { })

router.get('/callback', passport.authenticate('steam', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/')
})

router.post('/logout', (req, res) => {
  req.session.passport = {}
  req.logout()
  res.json({
    message: 'Logged out',
  })
})

router.get('/loggedin', (req, res) => {
  res.json(req.user || null)
})

export default router
