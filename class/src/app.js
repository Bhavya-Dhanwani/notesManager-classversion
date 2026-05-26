import express from "express";
import { config } from "dotenv"
import connectDB from "./config/db.config.js";
config();

const app = express();
await connectDB();



export default app;