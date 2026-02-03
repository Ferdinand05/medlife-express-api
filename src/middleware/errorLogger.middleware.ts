import winston from "winston";
import expressWinston from "express-winston";
export const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app.log",
      level: "warn",
    }),
  ],
  format: winston.format.combine(winston.format.simple(), winston.format.json()),
});
