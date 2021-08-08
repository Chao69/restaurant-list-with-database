const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Restaurant = require('../../models/restaurant')


// add new restaurant
router.get('/add', (req, res) => {
  res.render('add')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// define search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.findOne({ userId })
    .lean()
    .then(restaurants => {
      restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword))
      if (restaurants.length === 0) {
        res.render('index', { restaurants: restaurants, keyword: keyword, alert: `<h1 class="display-5 mt-5 text-info text-center">No results.</h1>` })
      } else {
        res.render('index', { restaurants: restaurants, keyword: keyword })
      }
    })
    .catch(error => console.error(error))
})

// view restaurant detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit restaurant info
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// delete restaurant
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router