const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// define home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router