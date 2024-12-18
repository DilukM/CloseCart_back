import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import participantRoutes from "./routes/participantRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();


app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(cors({
  origin: ["https://closecart-front.vercel.app/"],
  method: ["POST", "GET"],
  credentials: true,
}));
app.use(json());

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


