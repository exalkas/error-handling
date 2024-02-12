import express from "express";
import "dotenv/config";
import DBConnect from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
DBConnect();
app.use(
  cors({
    origin: process.env.production
      ? "https://error-handling-sigma.vercel.app"
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser()); // to reade cookies
app.use(express.json()); // to parse bodies in a request
app.use("/uploads", express.static("uploads"));

// array.push
app.use("/posts", postRoutes); // sends control to postRoutes file
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("Server is up and running!");
});
