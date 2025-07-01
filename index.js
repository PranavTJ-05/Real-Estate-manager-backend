import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
