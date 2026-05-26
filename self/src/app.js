import express from "express";
import { config } from "dotenv";
import connecDB from "./config/db.config.js";

config();

const app = express();
app.use(express.json());
await connecDB();


export default app;