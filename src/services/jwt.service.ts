import jwt, { Secret } from "jsonwebtoken";
import { UserSchema } from "../models/model.user";
import { appConfig } from "../config/app.config";
export class JwtService {
  static generateToken(
    user: Omit<UserSchema, "id" | "password" |"username" | "image">
  ): string {
    const token = jwt.sign(
      { userName: user.name , email: user.email },
      appConfig.jwtSecret as Secret,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
  static verifyToken(
    token: string
  ): Omit<UserSchema, "id" | "password" |"username" | "image"> | null {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret as Secret) as {
        userName: string;
        email:string;
      };
      const user: Omit<UserSchema, "id" | "password" |"username" | "image"> = {
        name: decoded.userName,
        email: decoded.email,
      };
      return user;
    } catch (error) {
      return null;
    }
  }
}
