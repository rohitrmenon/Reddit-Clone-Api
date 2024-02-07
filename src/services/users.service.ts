import { UserSchema, User } from "../models/model.user";
import logger from "../helpers/logger";
import { JwtService } from "./jwt.service";
export class UsersService {
  public async get(id: number): Promise<UserSchema | string> {
    try {
      const user = await User.query().findById(id);
      if (user) {
        return user;
      } else {
        throw new Error(`User with ID ${id} not found`);
      }
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving user: ${e.message}`;
    }
  }

  public async getAllUsers(): Promise<UserSchema[] | string> {
    try {
      const allUsers = await User.query();
      return allUsers;
    } catch (e) {
      logger.error(e);
      return `Error retrieving all users:`;
    }
  }

  public async create(
    requestBody: Omit<UserSchema, "id" | "createdAt" | "updatedAt">
  ) {
    try {
      const result = await User.query().insert(requestBody);
      const token = JwtService.generateToken(result);
      return {
        token,
        ...result,
      };
    } catch (e) {
      logger.error(e);
      return "Error creating User";
    }
  }

  public async login(
    requestBody: Pick<UserSchema, "email" | "password">
  ): Promise<UserSchema | string > {
    const user = await User.query().findOne({
      email: requestBody.email,
    });
    if (user) {
      if (await user.comparePassword(requestBody.password)) {
        const token = JwtService.generateToken(user);
        console.log(token)
        return {
          token,
          ...user,
        } as UserSchema;
      } else {
        return "Incorrect Password";
      }
    }
    else{
      return "User not found"
    }
  }
}
