import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production' && process.env.APP_ENV !== 'unit-test') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

logger.exception = (exception) => {
  const { message } = winston.exceptions.getAllInfo(exception)
  logger.error({
    message,
  })
}

export default logger
