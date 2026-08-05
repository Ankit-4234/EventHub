import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.get("/", (req, res) => res.send("EventHub API running"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
