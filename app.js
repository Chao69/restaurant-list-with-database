const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
const session = require('express-session')

const app = express()
const routes = require('./routes')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))

app.set('view engine', 'hbs')

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})

