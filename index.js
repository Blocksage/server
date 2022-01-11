const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./middleware/hasura'))

const port = process.env.PORT || 3000

app.get('/', require('./api/static/root'))
app.post('/auth/login', require('./api/auth/login'))
app.post('/auth/register', require('./api/auth/register'))
app.get('/v1/policies', require('./api/headless/policies'))
app.post('/v1/task', require('./api/headless/task'))
app.get('/check-results', require('./api/headless/results'))

if (!process.env.BLOCKSAGE_JWT_SECRET) {
  console.error('BLOCKSAGE_JWT_SECRET not set')
  process.exit(1)
}

if (!process.env.BLOCKSAGE_EFFECT_PVT_KEY) {
  console.error('BLOCKSAGE_EFFECT_PVT_KEY not set')
  process.exit(1)
}

app.listen(port, () => {
  console.log(`BlockSage Server listening on Port ${port}`)
})
