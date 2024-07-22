import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api", apiRouter);

export default app;
