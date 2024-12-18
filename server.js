require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const participantRoutes = require("./routes/participantRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["https://closecart-front.vercel.app/"],
  method: ["POST", "GET"],
  credentials: true,
}));
app.use(express.json());

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
    error: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});


