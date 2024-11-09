import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth_route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //allow us to parse incoming requests: req.body

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  connectDB();
  console.log("server is running on port: ", port);
});
