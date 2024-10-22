import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app = express();
const connectDB = async () => {
try {
    console.log("pttttttt",process.env.PORT);
    const connectionInstance = await mongoose.connect(`${process.env.dburl}/${DB_NAME}`);
    console.log(`MongoDB connected....!!!  DB Host on port: ${connectionInstance.connection.host}`);
      
} catch (error) {
    console.log("MONGO DB connection error :",error);
    process.exit(1)
    throw error;
}

}

export default connectDB