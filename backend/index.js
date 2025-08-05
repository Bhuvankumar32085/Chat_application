import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./SocketIO/server.js";
import path from 'path';

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//route
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


app.use(express.static(path.join(__dirname,'frontend/dist')))//
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
})//


// Start server after DB connection
connectDB()
  .then(() => {
    console.log("MongoDB Connected Successfully");
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
