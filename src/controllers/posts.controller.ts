import {
  Route,
  Get,
  Controller,
  Tags,
  Body,
  SuccessResponse,
  Post,
  Path,
  Query,
} from "tsoa";
import { PostsService } from "../services/posts.service";
// import { PostSchema } from "../models/model.post";
@Route("api/v1/posts")
@Tags("Posts")
export class PostsController extends Controller {
  private __PostsService = new PostsService();

  @Get()
  public getAllPosts() {
    this.setStatus(200);
    return this.__PostsService.getAllPosts();
  }

  @Get("/getPostById/{postId}")
  public getPost(@Path() postId: number) {
    this.setStatus(200);
    return this.__PostsService.get(postId);
  }

  @Get("/paginate")
  public viewPosts(
    @Query() limit: number,
    @Query() pageParam: number,
    @Query() subredditName?: string
  ) {
    console.log(limit, pageParam, subredditName);
    this.setStatus(200);
    return "up and running";
  }

  @Post("/create")
  @SuccessResponse("201", "Created")
  public createPost(@Body() requestBody: any) {
    this.setStatus(200);
    return this.__PostsService.create(requestBody);
  }

  @Post("/link")
  public async linkLoader(@Body() requestBody: any) {
    console.log(requestBody);
    // TODO: Implement this
  }
}
