import dotenv from "dotenv"; // npm package to handle env
dotenv.config(); // file se variable pe load karta hai

import express from "express";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import AuthRoutes from "../server/src/routes/authRouter.js"


const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", AuthRoutes);


app.get("/",(req,res) =>{
    res.json({message:"server connected"})
})


app.use((err,req,res,next)=>{
    const errorMessage = err.message || "Internal Server Error"
    const errorCode= err.statusCode || 500
    res.status(errorCode).json({message:errorMessage})
})


const port =process.env.PORT || 5000;

app.listen(port,() => {
    console.log("Server Started at",port);
    connectDB();
})