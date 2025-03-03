import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { logger } from './libs/logger'
import { v1Router } from './ingoing/routes'
import { sessionMiddleware } from './ingoing/middlewares/session'
import { redis } from './libs/redis'
import { handleEvents } from './ingoing/sockets'
import { httpLoggerMiddleware, socketLoggerMiddleware } from './ingoing/middlewares/logger'

const { PORT, IO_SECRET, DATABASE_URL, CACHE_URL } = process.env

if (!PORT || !IO_SECRET || !DATABASE_URL || !CACHE_URL)
  throw new Error('env variable PORT or IO_SECRET or DATABASE_URL or CACHE_URL not defined')

const entry = async () => {
  const app = express()
  const server = createServer(app)
  const io = new Server(server, { path: '/socket' })

  app.use(httpLoggerMiddleware)
  app.use(sessionMiddleware)
  app.use(express.json())
  app.use(express.static('../storage'))

  app.use('/api/v1', v1Router)

  io.on('connection', (socket) => {
    socket.use(socketLoggerMiddleware)

    handleEvents(socket, io)
  })

  await redis.connect().then(() => logger.info('redis connected successfuly'))

  server.listen(PORT, () => logger.info(`App started on http://127.0.0.1:${PORT}`))
}

entry()
