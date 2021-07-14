const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const data = require('../../restaurant.json')
const list = data.results

db.once('open', () => {
  list.forEach(restaurant => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Data created')
})