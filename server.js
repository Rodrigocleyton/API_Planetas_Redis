require('dotenv').config()
const express = require('express')
const { getPlanetById } = require('./src/helper/axios-helper')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send({ message: 'Bem-vindo ao App de Planetas ' })
})


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
