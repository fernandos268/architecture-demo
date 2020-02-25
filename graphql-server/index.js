const { ApolloServer } = require('apollo-server-express')
const { RedisCache } = require('apollo-server-cache-redis')
// const Redis = require('ioredis')
const responseCachePlugin = require('apollo-server-plugin-response-cache')
const cors = require('cors')
const redis = require('redis')
const app = require('express')()

const kafka = require('kafka-node')

const httpServer = require('http').createServer(app)

global.config = require('./config')

const typeDefs = require('./src/typeDefs')
const resolvers = require('./src/resolvers')
const { CustomRedis } = require('./src/context')

const CustomRedisCache = require('./utils/CustomRedisCache')

const { ljpAPI, kafka_datasource } = require('./src/datasources')

const {
  APP_PORT,
  REDIS_HOST,
  REDIS_PORT,
  KAFKA_SERVERS
} = config

const topics = [
  'cachedemo-mutation-response',
]

const options = {
  autoCommit: true,
  fromOffset: 'latest',
  groupId: 'CACHE_DEMO_KAFKA'
}

const consumer = new kafka.ConsumerGroup(options, topics);

const client = new kafka.KafkaClient({ kafkaHost: KAFKA_SERVERS })
const HighLevelProducer = kafka.HighLevelProducer
const producer = new HighLevelProducer(client)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ({
    ...ctx,
    redis: new CustomRedis({
      host: REDIS_HOST
    }),
    kafka: new kafka_datasource({ producer, consumer })
  }),
  dataSources: () => ({
    ljpAPI: new ljpAPI()
  }),
  cache: new CustomRedisCache(REDIS_HOST),
  persistedQueries: {
    cache: new RedisCache({
      host: REDIS_HOST,
    }),
  },
  cacheControl: true,
  plugins: [responseCachePlugin()]
})

server.applyMiddleware({
  app,
  cors: {
    origin: '*'
  }
})
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: APP_PORT }, () => {
  console.log(
    `Apollo Server websocket on  ws://localhost:${APP_PORT}${server.subscriptionsPath}`
  )
  console.log(`Apollo Server http on http://localhost:${APP_PORT}${server.graphqlPath}`)
})
