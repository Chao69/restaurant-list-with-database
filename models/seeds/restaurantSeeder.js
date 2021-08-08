const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant.json').results
const list = data.results
const User = require('../user')
const bcrypt = require('bcryptjs')

// 種子使用者
const SEED_USERS = [
  {
    name: 'Eric',
    email: 'user1@example.com',
    password: '12345678',
    ownRestaurantsId: [1, 2, 3]
  },
  {
    name: 'Jackson',
    email: 'user2@example.com',
    password: '12345678',
    ownRestaurantsId: [4, 5, 6]
  }
]


db.once('open', () => {
  Promise.all(Array.from(SEED_USERS, (SEED_USER, i) => {
    // 先將使用者密碼做雜湊，再透過雜湊過後的密碼丟到資料庫建立資料，以避免使用者密碼後台看得一清二楚
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      }))
      // 取出剛建立的使用者，做擁有餐廳的資料建立
      .then(user => {
        const userId = user.id
        // 透過filter將使用者擁有的餐廳id跟data餐廳的id對比，相同的抽出。
        const restaurants = data.filter(restaurant => SEED_USER.ownRestaurantsId.includes(restaurant.id))
        // 透過forEach將抽出的餐廳加上userId綁定該使用者
        restaurants.forEach(restaurant => restaurant.userId = userId)
        return Restaurant.create(restaurants)
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})