import express from "express";
import cors from "cors";
import routes from "./routes/index";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

export default app;
