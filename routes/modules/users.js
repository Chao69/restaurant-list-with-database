const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// login router
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// logout router
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

// register router
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  // 透過email找資料庫使否有重複的email
  User.findOne({ email })
    .then(user => {
      // 若有重複，則無法註冊
      if (user) {
        console.log('User already exists.')
        // 將使用者輸入的資料回傳至register page保留
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 若無重複，則在DB新增一筆使用者資料
        return User.create({
          name,
          email,
          password
        })
        .then(() => res.redirect('/'))
        .catch(error => console.error(error))
      }
    })
})

module.exports = router