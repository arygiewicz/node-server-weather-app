const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeocode = require('./utils/geocode')
const getForecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
// If this is not set, views folder is taken as default
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Anna'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Anna'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Need any help?',
    title: 'Help',
    name: 'Anna'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query || {}

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  getGeocode(address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    getForecast(lat, lon, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast,
        location,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  const products = [{
    games: [{
      title: 'Ghostrunner', rating: 5
    }, {
      title: 'Cyberpunk', rating: 4
    }, {
      title: 'The Witcher', rating: 5
    }]
  }, {
    furniture: ['counch', 'chair']
  }]

  const returnProducts = (products, searchQuery, rating) => {
    const result = products.filter((product) => product[searchQuery])

    if (searchQuery === 'games' && rating) {
      return result[0].games.filter((game) => game.rating === parseInt(rating))
    }

    return result
  }

  res.send({
    products: returnProducts(products, req.query.search, req.query.rating)
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Help article not found',
    name: 'Anna'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found',
    name: 'Anna'
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000.')
})