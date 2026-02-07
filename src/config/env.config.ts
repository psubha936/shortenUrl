import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "MONGO_URI", "BASE_URL"];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ Missing required env: ${key}`);
    process.exit(1);
  }
}

export const ENV = {
  PORT: Number(process.env.PORT),
  MONGO_URI: process.env.MONGO_URI!,
  BASE_URL: process.env.BASE_URL!,
};