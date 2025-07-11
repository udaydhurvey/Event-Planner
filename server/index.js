import dotenv from "dotenv"; // npm package to handle env
dotenv.config(); // file se variable pe load karta hai

import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./src/config/db.js";
import AuthRoutes from "../server/src/routes/authRouter.js";
import UserRouter from "../server/src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "./src/config/cloudinary.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", AuthRoutes);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.json({ message: "server connected" });
});

app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const errorCode = err.statusCode || 500;
  res.status(errorCode).json({ message: errorMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log("Server Started at", port);
  try {
    await connectDB();
    await cloudinary.api.resources({ max_results: 1 });
    console.log("Cloudinary Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
