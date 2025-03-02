import winston from 'winston'
import 'winston-daily-rotate-file'

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
  format: winston.format.combine(winston.format.colorize(), winston.format.simple())
})
