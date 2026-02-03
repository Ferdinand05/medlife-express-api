import expressWinston from "express-winston";
import winston from "winston";

export const loggerMiddleware = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "info",
    }),
  ],
  format: winston.format.combine(winston.format.simple(), winston.format.json()),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: false,
  colorize: true,
});
