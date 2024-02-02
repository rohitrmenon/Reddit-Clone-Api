import {
  Route,
  Get,
  Controller,
  Tags,
  Body,
  SuccessResponse,
  Post,
  Path,
} from "tsoa";
import { PostsService } from "../services/posts.service";
import { PostSchema } from "../models/model.post";
@Route("api/v1/posts")
@Tags("Posts")
export class PostsController extends Controller {
  private __PostsService = new PostsService();

  @Get("{postId}")
  public getPost(@Path() postId: number) {
    this.setStatus(200);
    return this.__PostsService.get(postId);
  }

  @Get()
  public getAllPosts() {
    this.setStatus(200);
    return this.__PostsService.getAllPosts();
  }

  @Post()
  @SuccessResponse("201", "Created")
  public createPost(
    @Body() requestBody: Omit<PostSchema, "id" | "createdAt" | "updatedAt">
  ) {
    this.setStatus(200);
    return this.__PostsService.create(requestBody);
  }
}