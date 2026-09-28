import { env } from "../config/env.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 900,
    }
  );
};
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 7 * 24 * 60 * 60, // 7 days
    }
  );
};
