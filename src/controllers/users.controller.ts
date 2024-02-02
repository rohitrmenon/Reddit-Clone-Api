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
import { JwtService } from "../services/jwt.service";
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

  @Post()
  @SuccessResponse("201", "Created")
  public createUser(
    @Body() requestBody: Omit<UserSchema, "id" | "createdAt" | "updatedAt">
  ) {
    this.setStatus(200);
    return this.__UsersService.create(requestBody);
  }

  @Post("/login")
  public async login(@Body() requestBody: { id: number; name: string }) {
    const user = JwtService.generateToken(requestBody);
    return user;
  }
}
