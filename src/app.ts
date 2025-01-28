import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(morgan("dev")); // for logging requests to the console

export default app;
