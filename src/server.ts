import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";

// has to be before the app import
dotenv.config();

import app from "./app";

const server = http.createServer(app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Menu Management server is running on port ${PORT}`);
});
