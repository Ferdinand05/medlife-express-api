import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import routes from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

export default app;
