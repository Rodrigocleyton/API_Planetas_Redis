// src/app/helper/axios-helper.js
const axios = require('axios')

async function getPlanetById(id) {
  try {
    const url = `https://swapi.dev/api/planets/${id}/`
    const response = await axios.get(url)
    return response.data
   
  } catch (error) {
    console.error(` Erro ao buscar planeta: ${error.message}`)
    throw new Error('Falha ao buscar dados do planeta')
  }
}

module.exports = { getPlanetById }
