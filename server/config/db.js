import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("connection string", process.env.MONGO_URI);
const connectTomongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connection is Established");
  } catch (err) {
    console.log("Mongodb connection is failed", err);
  }
};

connectTomongo();
mongoose.connection.on("connected", () => {
  console.log("Mongo is Ready");
});

mongoose.connection.on("error", () => {
  console.log("Mongo is failed");
});

export default connectTomongo;
