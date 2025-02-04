// backend/server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:5176", // Replace with your frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(8000, () => {
  console.log(`Server running on port ${PORT}`);
});
