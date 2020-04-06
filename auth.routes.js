const passport = require('passport')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = require('express').Router()
const User = require('../models/User')

// /api/auth/register
router.post('/register', [
  check('username'),
  check('email', 'Incorrect email').isEmail(),
  check('password', 'Minimum password length is 6 or more characters').isLength({min: 6})
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      if (req.body.email && req.body.username && !req.body.password) {
        return res.status(400).json({message: 'Enter password'})
      }

      return res.status(400).json({errors: errors.array(), message: 'Incorrect data'})
    }

    const {username, email, password} = req.body

    const candidate = await User.findOne({email})

    if (candidate) {
      return res.status(400).json({message: 'User already exists'})
    } else if (!username) {
      return res.status(400).json({message: 'Enter username'})
    }

    const user = new User({username, email, password})
    await user.save()

    res.status(201).json({message: 'User created!'})

  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'})
  }
})

// /api/auth/login
router.post('/login', [
  check('email', 'Incorrect email').normalizeEmail().isEmail(),
  check('password', 'Enter password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array(), message: 'Incorrect data'})
    }

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({message: 'User not found'})
    } else if (user.status === 'Blocked') {
      return res.status(400).json({message: 'User blocked'})
    }

    const isMatch = await password.localeCompare(user.password)

    if (!!isMatch) {
      return res.status(400).json({message: 'Incorrect password, please try again'})
    }

    const token = jwt.sign({
      userId: user.id
    }, config.get('jwtSecret'), {expiresIn: '1h'})

    res.json({token, userId: user.id, email, username: user.username})

    user.lastLoginDate = Date.now()
    await user.save()

  } catch (e) {
    res.status(500).json({message: 'Something went wrong, please try again'})
  }
})



// auth with google+
router.get('/google',
passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {

  if (req.user.status === 'Blocked') {
    res.redirect(process.env.DOMAIN || 'localhost3000' + `signin?status=${req.user.status}`)
    return
  }

  res.redirect(process.env.DOMAIN || 'localhost3000' + `?token=${req.user.token}&id=${req.user._id}&email=${req.user.email}&username=${req.user.username}`)
});


//spotify
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ['user-read-email']
  })
);

router.get("/spotify/redirect", passport.authenticate("spotify"), (req, res) => {
  if (req.user.status === 'Blocked') {
    res.redirect(process.env.DOMAIN || 'localhost3000' + `/signin?status=${req.user.status}`)
    return
  }

  res.redirect(process.env.DOMAIN || 'localhost3000' + `?token=${req.user.token}&id=${req.user._id}&email=${req.user.email}&username=${req.user.username}&status=${req.user.status}`)
});

module.exports = router
