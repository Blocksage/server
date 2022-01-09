const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.get('/', require('./api/static/root'))
app.post('/auth/login', require('./api/auth/login'))
app.post('/auth/register', require('./api/auth/register'))

if (!process.env.BLOCKSAGE_JWT_SECRET) {
  console.error('BLOCKSAGE_JWT_SECRET not set')
  process.exit(1)
}

app.listen(port, () => {
  console.log(`BlockSage Server listening on Port ${port}`)
})
