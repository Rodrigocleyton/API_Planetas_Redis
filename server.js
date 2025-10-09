require('dotenv').config()
const express = require('express')
const { getPlanetById } = require('./src/helper/axio-helper')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send({ message: 'Bem-vindo ao App de Planetas ' })
})

app.get('/api/planets/:id', async (req, res) => {
  try {
    const id = req.params.id
    const planet = await getPlanetById(id)
    res.json(planet)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`)
})
