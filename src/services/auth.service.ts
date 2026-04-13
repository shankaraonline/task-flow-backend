import User from "../schemas/user.schema";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
      throw new Error("Invalid username or password");
    }

    const token = generateToken({
      id: user._id,
      tenantId: user.tenantId,
      role: user.role,
      level: user.level
    });

    return {
      token,
      user
    };

  } catch (error) {
    throw error;
  }
};