import jwt, { Secret } from "jsonwebtoken";
import { UserSchema } from "../schemas/user.schema";
import { appConfig } from "../config/app.config";
export class JwtService {
  static generateToken(user: Pick<UserSchema, "email" | "name">): string {
    const token = jwt.sign(
      { userName: user.name, email: user.email },
      appConfig.jwtSecret as Secret,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
  static verifyToken(token: string): Pick<UserSchema, "email" | "name"> | null {
    try {
      const decoded = jwt.verify(token, appConfig.jwtSecret as Secret) as {
        userName: string;
        email: string;
      };
      const user: Pick<UserSchema, "email" | "name"> = {
        name: decoded.userName,
        email: decoded.email,
      };
      return user;
    } catch (error) {
      return null;
    }
  }
}
