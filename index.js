import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import {clerkMiddleware} from "@clerk/express";
import connectDB from "./db/index.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./src/inngest"

dotenv.config();

const app = express();

//Database connection
await connectDB();

// Regular Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

//cookie parser middleware
app.use(cookieParser());
app.use(clerkMiddleware());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("gomtha running da");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
