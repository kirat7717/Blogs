import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected: ", process.env.MONGO_URI);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
