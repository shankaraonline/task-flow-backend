import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import User from "../schemas/user.schema";
import { env } from "../config/env";

dotenv.config();

async function createSuperAdmin() {

  try {

    await mongoose.connect(env.MONGO_URI);

    const existing = await User.findOne({
      role: "super_admin"
    });

    if (existing) {
      console.log("Super admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const superAdmin = await User.create({
      name: "Super Admin",
      username: "superadmin",
      password: hashedPassword,
      role: "super_admin",
      level: 99
    });

    console.log("Super admin created:");
    console.log(superAdmin);

    process.exit(0);

  } catch (error) {

    console.error(error);
    process.exit(1);

  }

}

createSuperAdmin();