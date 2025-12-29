import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./routes/index";
import morgan from "morgan";
import { startEmailReminderJob } from "./jobs/emailReminder.job";

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

// scheduler job
startEmailReminderJob();

export default app;
