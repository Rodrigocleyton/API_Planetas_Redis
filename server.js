require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { requestLogger } = require('./src/middlewares/logger')
const planetsRoutes = require('./src/routers/planets_routers')


app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) =>{
  res.send("Welcome to Planets API")
})

app.use('/api/planets', planetsRoutes)

app.listen(port, () =>{
  console.log(`App running in door ${port}`)
})


// require('dotenv').config()
// const express = require('express')
// const { requestLogger } = require('./src/middlewares/logger')          
// const planetsRoutes = require('./src/routers/planets_routers')

// const app = express()
// const port = process.env.PORT || 3000

// app.use(express.json())
// app.use(requestLogger)

// app.get('/', (req, res) => {
//   res.send({ message: 'Bem-vindo ao App de Planetas ' })
// })


// app.use('/api/planets', planetsRoutes)

// app.listen(port, () => {
//   console.log(`App rodando na porta ${port}`)
// })
