const Redis = require('ioredis')

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
  maxRetriesPerRequest: 2,
  lazyConnect: true
})

const ensureRedis = async () => {
   if(redis.status === 'end' || redis.status === 'wait') {
     await redis.connect()
   }
}

const ns = (key) => {
  return `${NAMESPACE}:${key}`
}

const metricKey = (name) => {
  return `${NAMESPACE}:metrics:${name}`
}

const incrMetric = async (name) => {
  await ensureRedis()
  return redis.incr(metricKey(name))
}

const getMetric = async (name)=> {
  await ensureRedis()
  const value = await redis.get(metricKey(name))
  return Number(value || 0)
}

const pingRedis = async () => {
  await ensureRedis()
  return redis.ping()
}

module.exports = {
  redis,
  ensureRedis,
  ns,
  incrMetric,
  getMetric,
  pingRedis,
 }


