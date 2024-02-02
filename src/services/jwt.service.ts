import jwt, { Secret } from "jsonwebtoken";
import { UserSchema } from "../models/model.user";
import { appConfig } from "../config/app.config";
export class JwtService {
  static generateToken(
    user: Omit<UserSchema, "email" | "status" | "password">
  ): string {
    const token = jwt.sign(
      { userId: user.id, userName: user.name },
      appConfig.jwtSecret as Secret,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
  static verifyToken(
    token: string
  ): Omit<UserSchema, "email" | "status" | "password"> | null {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret as Secret) as {
        userId: number;
        userName: string;
      };
      const user: Omit<UserSchema, "email" | "status" | "password"> = {
        id: decoded.userId,
        name: decoded.userName,
      };
      return user;
    } catch (error) {
      return null;
    }
  }
}
