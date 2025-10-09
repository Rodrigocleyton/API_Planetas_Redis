const axios = require('axios')

const swapi = axios.create({
     baseURL: 'https://swapi.dev/api/',
     timeout: 10000
})

module.exports = { swapi }