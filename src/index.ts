import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UsersRouter } from "./routes/Users.routes";
import { BlogsRouter } from "./routes/Blogs.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use("/user", UsersRouter);
app.use("/blogs", BlogsRouter);

app.listen(8080, () => {
  console.log("Server Running on http://localhost:8080/");
});

const MONGO_URL = process.env.MONGO_URL || "";
mongoose.connect(MONGO_URL);
// mongoose.connection.on("error", (error: Error) => console.log(error));
