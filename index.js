const express = require('express')
const app = express()
const port = 3000

app.get('/', require('./api/static/root'))
app.post('/auth/login', require('./api/auth/login'))
app.post('/auth/register', require('./api/auth/register'))


app.listen(port, () => {
  console.log(`BlockSage Server listening on Port ${port}`)
})
