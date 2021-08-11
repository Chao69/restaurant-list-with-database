const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

// register router
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'email/password/Confirm Password欄位為必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 透過email找資料庫使否有重複的email
  User.findOne({ email })
    .then(user => {
      // 若有重複，則無法註冊
      if (user) {
        const emailConfirm = '此email已註冊過'
        console.log('User already exists.')
        // 將使用者輸入的資料回傳至register page保留
        res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          emailConfirm
        })
      } else {
        // 若無重複，則在DB新增一筆使用者資料
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
      }
    })
})

module.exports = router