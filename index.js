const express = require('express')
const path = require('path')
const usps = require('./usps.js')
const lob = require('lob')(process.env.LOB_API_KEY);
const PORT = process.env.PORT || 5000;

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
  .get('/address', (req, res) => {
    lob.usVerifications.verify(req.query, function(err, data) {
      if (err) {
        res.json({ error: err._response.body.error.message });
        res.end()
        return;
      }

      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify({
        address: [
          data.primary_line,
          data.secondary_line,
          data.last_line
        ],
        valid: (data.deliverability === "deliverable")
      }));
    });
  })

  // start server
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
