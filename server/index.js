import express from "express";
import "dotenv/config";
import DBConnect from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
DBConnect();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
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

// Last route before error handling
app.use((req, res, next) => {
  // If no routes match, this middleware will be executed
  res.status(404).send({
    error: "Not Found",
    message: "The requested resource was not found on this server.",
  });
});

app.use(errorMiddleware);

app.listen(5000, () => {
  console.log("Server is up and running!");
});
