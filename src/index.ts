import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

// has to be before the app import
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5050;
const server = http.createServer(app);

console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Menu Management server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  });

process.on("unhandledRejection", (err: any) => {
  console.log(`Unhandled Rejection: Error: ${err.message}`);
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err: any) => {
  console.log(`uncaught exception: Error: ${err.message}`);
  server.close(() => process.exit(1));
});
