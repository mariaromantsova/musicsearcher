const passport = require('passport')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = require('express').Router()


// /api/auth/register
router.post(
  '/register',
  [ check('username'),
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

    const {username, email, password} = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return res.status(400).json({ message: 'Такой пользователь уже существует' })
    } else if (!username) {
      return res.status(400).json({ message: 'Поле с именем не должно быть пустым' })
    }

    const user = new User({ username, email, password })
    await user.save()

    res.status(201).json({ message: 'Пользователь создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при входе в систему'
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' })
    } else if (user.status === 'Blocked') {
      return res.status(400).json({ message: 'Пользователь заблокирован' })
    }

    const isMatch = await password.localeCompare(user.password)

    if (!!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '1h' }
    )

    res.json({ token, userId: user.id, email, username: user.username })

    user.lastLoginDate = Date.now()
    await user.save()

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(req.user);
  // res.redirect('http://localhost:3000/');
});

// // auth with google+
// router.get('/google',
//   passport.authenticate('google', { scope: ['profile'] }));
//
// router.get('/google/redirect',
//   // passport.authenticate('google', { failureRedirect: '/login' }),
//   //   function(req, res) {
//   //     // Successful authentication, redirect home.
//   //     res.redirect('/');
//   });


module.exports = router
