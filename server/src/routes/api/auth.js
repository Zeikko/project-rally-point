import express from 'express'
import passport from '../../passport'

const router = express.Router()

router.get('/login', passport.authenticate('steam', { failureRedirect: '/login', session: true }), () => { })

router.get('/callback', passport.authenticate('steam', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.session.passport = {}
  req.logout()
  res.json({
    message: 'Logged out',
  })
})

export default router
