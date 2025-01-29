import express from "express";
import morgan from "morgan";
import { categoryRouter } from "./routes/category.routes";
import GlobalErrorHandler from "./errors";
import { subCategoryRouter } from "./routes/sub-category.routes";
import { itemsRouter } from "./routes/items.routes";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(morgan("dev")); // for logging requests to the console

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRouter);
app.use("/api/v1/items", itemsRouter);
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// @ts-ignore
app.use(GlobalErrorHandler);

export default app;
