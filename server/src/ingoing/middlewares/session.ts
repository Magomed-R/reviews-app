import session from 'express-session'

export const sessionMiddleware = session({
  secret: process.env.IO_SECRET!,
  resave: true,
  saveUninitialized: true
})