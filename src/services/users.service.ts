import { UserSchema, User } from "../models/model.user";
import logger from "../helpers/logger";
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
      const newUser = await User.query().insert(requestBody);
      return newUser;
    } catch (e) {
      logger.error(e);
      return "Error creating User";
    }
  }
}
