import {
  Route,
  Get,
  Controller,
  Tags,
  Body,
  SuccessResponse,
  Post,
} from "tsoa";
import { PostsService } from "../services/posts.service";
import { PostSchema } from "../models/Post";
@Route("posts")
@Tags("Posts")
export class PostsController extends Controller {
  private __PostsService = new PostsService();

  @Get()
  public async getAllPosts(): Promise<PostSchema[] | undefined> {
    this.setStatus(200);
    return this.__PostsService.getPosts();
  }

  @Post()
  @SuccessResponse("201", "Created")
  public async createPost(
    @Body() requestBody: Omit<PostSchema, "id" | "createdAt" | "updatedAt">
  ) {
    this.setStatus(200);
    return this.__PostsService.create(requestBody);
  }
}
