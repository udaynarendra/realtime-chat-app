import { type Request, type Response, type NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utility.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({
      success: false,
      message: "Invalid authorization header",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      userId: payload.userId,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};