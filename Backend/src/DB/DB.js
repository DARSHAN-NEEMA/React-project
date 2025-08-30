import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";
import dotenv from "dotenv";
dotenv.config();

const connect_db = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGOOSE_URL}/${DB_NAME}`
    );
    console.log(`MongoDB connected !! on DB host  ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("mongoose connection error", error);
    process.exit();
  }
};
connect_db();
export default connect_db;