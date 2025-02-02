// backend/server.js
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Import user routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
app.use("/api/users", userRoutes); // Mount user routes on /api/users

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
