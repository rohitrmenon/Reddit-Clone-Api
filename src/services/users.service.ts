import { v4 as uuidv4 } from "uuid";

import { User } from "../models/model.user";
import {
  UserLoginResponseSchema,
  UserLoginSchema,
  UserRegisterResponseSchema,
  UserRegisterSchema,
  UserSchema,
} from "../schemas/user.schema";
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

  public async create(requestBody: UserRegisterSchema):Promise<UserRegisterResponseSchema | string> {
    try {
      const id = uuidv4();

      const user = await User.query().insert({ ...requestBody, id });
      const token = JwtService.generateToken(user);
      const { password, ...userWithoutPassword } = user;
      console.log(token);
      return { ...userWithoutPassword, token };
    } catch (e) {
      logger.error(e);
      return "Error creating User";
    }
  }

  public async login(
    requestBody: UserLoginSchema
  ): Promise<UserLoginResponseSchema | string> {
    const user = await User.query().findOne({
      email: requestBody.email,
    });
    if (user) {
      if (await user.comparePassword(requestBody.password)) {
        const token = JwtService.generateToken(user);
        const { password, ...userWithoutPassword } = user;
        console.log(token);
        return { ...userWithoutPassword, token };
      } else {
        return "Incorrect Password";
      }
    } else {
      return "User not found";
    }
  }
}
