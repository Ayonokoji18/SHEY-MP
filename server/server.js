import express from "express";
import dotenv from "dotenv";
import connectTomongo from "../server/config/db.js";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/userRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectTomongo();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Node Js Server is Started on port ${port}`);
});
