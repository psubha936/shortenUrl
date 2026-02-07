
import mongoose from "mongoose";
import { ENV } from "./env.config";
import { logger } from "../utils/logger.util";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection failed");
    process.exit(1);
  }
};
