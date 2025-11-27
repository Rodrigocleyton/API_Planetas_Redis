const express = require ('express')
const router = express.Router()

const {
    handleGetAllPlanets,
    handleGetPlanetById
} = require('../controllers/planets_controller')

router.get('/', handleGetAllPlanets)

router.get('/:id', handleGetPlanetById)

module.exports = router 

// const express = require('express')
// const router = express.Router()

// // importa o controller
// const {
//   handleGetAllPlanets,
//   handleGetPlanetById
// } = require('../controllers/planets_controller')

// // rota para listar planetas (página opcional)
// router.get('/', handleGetAllPlanets)

// // rota para buscar planeta pelo ID
// router.get('/:id', handleGetPlanetById)

// module.exports = router
