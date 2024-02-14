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
import {
  UserLoginResponseSchema,
  UserLoginSchema,
  UserRegisterResponseSchema,
  UserRegisterSchema,
} from "../schemas/user.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
@Route("api/v1/users")
@Tags("Users")
export class UserController extends Controller {
  private __UsersService = new UsersService();

  @Get("{userId}")
  @Middlewares(authMiddleware)
  public getUser(@Path() userId: string) {
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
    @Body() requestBody: UserRegisterSchema
  ): Promise<UserRegisterResponseSchema | string> {
    try {
      const newUser = await this.__UsersService.create(requestBody);
      return newUser;
    } catch (e) {
      console.log(e);
      return "Error creating user";
    }
  }

  @Post("/login")
  @SuccessResponse("201", "User logged in successfully")
  public async loginUser(
    @Body() requestBody: UserLoginSchema
  ): Promise<UserLoginResponseSchema | string> {
    const user = await this.__UsersService.login(requestBody);
    return user;
  }
}
