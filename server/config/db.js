import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log("Connection String", process.env.MONGO_URI);

const connectTomongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connection is Established");
  } catch (err) {
    console.log("Mongodb is Failed", err);
  }
};

connectTomongo();

mongoose.connection.on("error", () => {
  console.log("Mongo connection is failed");
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb is Ready");
});

export default connectTomongo;
