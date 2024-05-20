import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//error handling middleware
// jwt toker middleware
export const vefifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    console.log("access denied");
    throw new Error("access denied");
  }
  try {
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("jwt secret not defined");
    }

    const decodded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodded) {
      throw new Error("Token verification failed");
    }
    next();
  } catch (error) {
    throw error;
  }
};
