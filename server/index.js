import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";

import authRouter from "../server/src/routes/authRouter.js"


const app = express();
app.get("/",(req,res) =>{
    res.json({message:"server connected"})
})

app.use("/auth", authRouter);

const port =process.env.PORT || 5000;

app.listen(port,() => {
    console.log("Server Started at",port);
    connectDB();
})