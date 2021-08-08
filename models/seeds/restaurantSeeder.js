const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant.json').results
const list = data.results
const User = require('../user')
const bcrypt = require('bcryptjs')

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
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      }))
      .then(user => {
        const userId = user.id
        const restaurants = data.filter(restaurant => SEED_USER.ownRestaurantsId.includes(restaurant.id))
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

// list.forEach(restaurant => {
//   Restaurant.create({
//     id: restaurant.id,
//     name: restaurant.name,
//     name_en: restaurant.name_en,
//     category: restaurant.category,
//     image: restaurant.image,
//     location: restaurant.location,
//     phone: restaurant.phone,
//     google_map: restaurant.google_map,
//     rating: restaurant.rating,
//     description: restaurant.description
//   })
// })