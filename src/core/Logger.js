import config from 'config';
import winston from 'winston';

const SERVICE = config.service;

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config.logger.level,
      handleExceptions: true,
      json: false,
      colorize: false,
      timestamp: () => (new Date()).toISOString(),
      formatter(options) {
        let meta = '';
        if (options.meta && Object.keys(options.meta).length) {
          meta = (options.meta.stack || JSON.stringify(options.meta, null, 2));
        }

        const timestamp = options.timestamp();
        const level = options.level.toUpperCase();
        const msg = (options.message ? options.message : '');

        return `${timestamp} [${SERVICE}] ${level} - ${msg} ${meta}`;
      },
    }),
  ],
});

export default logger;
