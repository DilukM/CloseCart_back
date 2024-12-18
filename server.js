import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import mongoose from "mongoose";
import participantRoutes from "./routes/participantRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(cors({
  origin: ["https://closecart-front.vercel.app/"],
  method: ["POST", "GET"],
  credentials: true,
}));
app.use(json());

app.use(express.json());

// Connect to Database
mongoose
  .connect(
    "mongodb+srv://ghost:ghost99@esm.gjtd61h.mongodb.net/ESM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// Routes
app.use("/api/research", participantRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});


