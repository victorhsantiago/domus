import cors from 'cors'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { configDotenv } from 'dotenv'
import { expressMiddleware } from '@apollo/server/express4'
import { json } from 'body-parser'

const typeDefs = `#graphql
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world',
  },
}

configDotenv()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()

  const app = express()

  app.use(cors(), json(), expressMiddleware(server))

  const PORT = process.env.PORT || 4000

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error)
})
