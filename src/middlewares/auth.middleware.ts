import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";
import { UserSchema } from "../schemas/user.schema";

export interface CustomRequest extends Request {
  user: Pick<UserSchema, "email" | "name"> | null;
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
