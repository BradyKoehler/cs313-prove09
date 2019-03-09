const express = require('express')
const path = require('path')
const usps = require('./usps.js')
const PORT = process.env.PORT || 5000

express()

  // settings
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')

  // routes
  .get('/', (req, res) => res.render('pages/index', { types: usps.types }))
  .get('/rates', (req, res) => {
    var type   = req.query["type"],
        weight = req.query["weight"],
        price  = usps.getPrice(type, weight);

    res.render('pages/rates', {
      type: usps.typeText(type),
      weight: weight,
      price: price
    })
  })

  // start server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
