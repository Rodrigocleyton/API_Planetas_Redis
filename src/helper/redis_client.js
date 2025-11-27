const Redis = require('ioredis')
//const { lazy } = require('react')

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
  NAMESPACE
} = process.env

const redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  db: Number(REDIS_DB),
  namespace: NAMESPACE,
  maxRetriesPerRequest: 2,
  lazyConnect: true
})

const enduranceRedis = async () => {
   if(redis.status === 'end' || redis.status === 'wait') {
     await redis.connect()
   }
}

// const Redis = require('ioredis')

// const {
//   REDIS_HOST,
//   REDIS_PORT,
//   REDIS_DB,
//   NAMESPACE 
// } = process.env

// const redis = new Redis({
//   host: REDIS_HOST,
//   port: Number(REDIS_PORT),
//   db: Number(REDIS_DB),
//   maxRetriesPerRequest: 2,
//   lazyConnect: true
// })

// // Garante que o Redis está conectado
// async function ensureRedis() {
//   if (redis.status === 'end' || redis.status === 'wait') {
//     await redis.connect()
//   }
// }

// // Prefixo por ambiente → dev:planet:1
// function ns(key) {
//   return `${NAMESPACE}:${key}`
// }

// // Métricas → dev:metrics:cache:hit
// function metricKey(name) {
//   return `${NAMESPACE}:metrics:${name}`
// }

// async function incrMetric(name) {
//   await ensureRedis()
//   return redis.incr(metricKey(name))
// }

// async function getMetric(name) {
//   await ensureRedis()
//   const value = await redis.get(metricKey(name))
//   return Number(value || 0)
// }

// // health check (PONG)
// async function pingRedis() {
//   await ensureRedis()
//   return redis.ping() // retorna 'PONG'
// }

// module.exports = {
//   redis,
//   ensureRedis,
//   ns,
//   incrMetric,
//   getMetric,
//   pingRedis
// }
