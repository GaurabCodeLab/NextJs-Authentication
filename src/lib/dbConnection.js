import "dotenv/config";
import mongoose from "mongoose";

const dbConnection = async () => {
  const options = {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
  };
  try {
    await mongoose.connect(process.env.DB_URI, options);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in connecting Databse", error);
  }
};

export default dbConnection;
