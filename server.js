
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import participantRoutes from "./routes/participantRoutes.js";

const app = express();
const PORT = 5000;


// Middleware
app.use(cors({
  origin: ["https://closecart-front.vercel.app/"],
  method: ["POST", "GET"],
  credentials: true,
}));
app.use(json());

// Connect to Database
connectDB().then(() => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
});

// Routes
app.use("/api/research", participantRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: "production" === "production" ? {} : err.stack,
  });
});


