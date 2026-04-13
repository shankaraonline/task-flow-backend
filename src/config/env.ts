import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY || "",
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY || "",
  VAPID_EMAIL: process.env.VAPID_EMAIL || ""
};