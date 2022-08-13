const express = require('express')
const app = express()
const router = app.router

router.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(3000)