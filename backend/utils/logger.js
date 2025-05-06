const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack || ''}`;
    })
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error'
    }),
    new transports.Console({ // Add this for console logging
      level: 'error'
    })
  ]
});

module.exports = logger;



// const { createLogger, transports, format } = require('winston');
// const path = require('path');

// const logger = createLogger({
//   level: 'error',
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.errors({ stack: true }),
//     format.printf(({ timestamp, level, message, stack }) => {
//       return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack || ''}`;
//     })
//   ),
//   transports: [
//     new transports.File({
//       filename: path.join(__dirname, '../logs/error.log'),
//       level: 'error'
//     })
//   ]
// });

// module.exports = logger;
