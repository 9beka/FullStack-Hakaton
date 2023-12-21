import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import crmRoutes from "./routes/crmRoutes.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/authRoutes", authRoutes);
app.use("/crmRoutes", crmRoutes);
const port = process.env.PORT || 5057;

// app.get("/save-products",) example for get data FROM fakeshopAPI : localhost.../crmRoutes/save-products

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
  console.log("Server is running at localhost: " + port);
});
