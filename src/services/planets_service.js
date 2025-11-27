const { swapi } = require('./../helper/axios-helper')
const {
  redis,
  ensureRedis,
  ns,
  incrMetric
} = require('./../helper/redis_client')

const CACHE_TTL_SECONDS = Number(process.env.CACHE_TTL_SECONDS || 600)

// chaves com namespace, ex: dev:planet:1
const kPlanet = (id) => ns(`planet:${id}`)
const kPage = (page) => ns(`planets:page:${page}`)

// Busca planeta por ID com cache
async function getPlanetById(id) {
  await ensureRedis()
  const key = kPlanet(id)

  // tenta cache
  const cached = await redis.get(key)
  if (cached) {
    await incrMetric('cache:hit')
    return { source: 'cache', data: JSON.parse(cached) }
  }

  // sem cache → busca na SWAPI
  const { data } = await swapi.get(`/planets/${id}/`)

  await redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS)
  await incrMetric('cache:miss')

  return { source: 'swapi', data }
}

// Lista planetas com paginação + cache
async function getAllPlanets(page = 1) {
  await ensureRedis()
  const key = kPage(page)

  const cached = await redis.get(key)
  if (cached) {
    await incrMetric('cache:hit')
    return { source: 'cache', data: JSON.parse(cached) }
  }

  const { data } = await swapi.get('/planets/', { params: { page } })

  await redis.set(key, JSON.stringify(data), 'EX', CACHE_TTL_SECONDS)
  await incrMetric('cache:miss')

  return { source: 'swapi', data }
}

module.exports = {
  getPlanetById,
  getAllPlanets
}
