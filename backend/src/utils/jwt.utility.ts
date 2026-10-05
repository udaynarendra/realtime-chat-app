import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

interface AccessTokenPayload {
  userId: string;
}

export const verifyAccessToken = (
  token: string,
): AccessTokenPayload => {
  const decoded = jwt.verify(
    token,
    env.ACCESS_TOKEN_SECRET!,
  );

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid access token payload");
  }

  return {
    userId: decoded.userId,
  };
};