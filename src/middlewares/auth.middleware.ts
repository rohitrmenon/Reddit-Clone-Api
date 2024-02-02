import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";
import { UserSchema } from "../models/model.user";

export interface CustomRequest extends Request {
  user: Omit<UserSchema, "id" | "status" | "password"> | null;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const user = JwtService.verifyToken(token);
    if (!user) {
      throw new Error();
    }

    (req as CustomRequest).user = user;
    next();
  } catch (err) {
    res.status(401).send("Please authenticate!");
  }
};
