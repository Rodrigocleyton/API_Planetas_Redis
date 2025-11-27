const {
  getPlanetById,
  getAllPlanets
} = require('../services/planets_service')

// GET /api/planets?page=1
async function handleGetAllPlanets (req, res) {
  try {
    const page = Number(req.query.page || 1)
    const result = await getAllPlanets(page)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/planets/:id
async function handleGetPlanetById (req, res) {
  try {
    const { id } = req.params
    const result = await getPlanetById(id)
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  handleGetAllPlanets,
  handleGetPlanetById
}
