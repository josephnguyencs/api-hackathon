var express = require('express')
var path = require('path')
var fetch = require('node-fetch')
var app = express()
require('dotenv/config')


app.use(express.static(path.join(__dirname, '../public')))

app.get('/api', (req, res, next) => {
  console.log("getting a request")
  var url = 'http://skimap.org/SkiAreas/index.xml'
  fetch(url)
  .then(response => response.text())
  .then(data => res.send(data))
  .catch(err => res.status(500).json(err))
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port ' + process.env.PORT)
})
