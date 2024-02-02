import {
  Route,
  Tags,
  Get,
  Post,
  Path,
  Body,
  SuccessResponse,
  Controller,
  Middlewares,
} from "tsoa";
import { UsersService } from "../services/users.service";
import { UserSchema } from "../models/model.user";
import { authMiddleware } from "../middlewares/auth.middleware";
@Route("api/v1/users")
@Tags("Users")
export class UserController extends Controller {
  private __UsersService = new UsersService();

  @Get("{userId}")
  public getUser(@Path() userId: number) {
    this.setStatus(200);
    return this.__UsersService.get(userId);
  }

  @Get()
  @Middlewares(authMiddleware)
  public getAllUsers() {
    this.setStatus(200);
    return this.__UsersService.getAllUsers();
  }

  @Post("/register")
  @SuccessResponse("201", "User registered successfully")
  public async createUser(
    @Body() requestBody: Omit<UserSchema, "id" | "createdAt" | "updatedAt">
  ): Promise<UserSchema | string> {
    const newUser = await this.__UsersService.create(requestBody);
    return newUser;
  }

  @Post("/login")
  @SuccessResponse("201", "User logged in successfully")
  public async loginUser(
    @Body() requestBody: Pick<UserSchema, "email" | "password">
  ): Promise<UserSchema | string> {
    const user = await this.__UsersService.login(requestBody);
    return user;
  }
}
