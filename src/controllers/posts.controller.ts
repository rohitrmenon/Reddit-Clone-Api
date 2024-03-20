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
  Patch,
} from "tsoa";
import { PostsService } from "../services/posts.service";
import { PostVoteSchema } from "../models/model.postVote";

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
    @Query() subredditId: string
  ) {
    return this.__PostsService.paginate(limit, pageParam, subredditId);
  }

  @Post("/create")
  @SuccessResponse("201", "Created")
  public createPost(@Body() requestBody: any) {
    this.setStatus(200);
    return this.__PostsService.create(requestBody);
  }

  @Patch("/vote")
  public voteForPost(
    @Body() requestBody: Omit<PostVoteSchema, "user" | "Post" | "id">
  ) {
    return this.__PostsService.vote(requestBody);
  }

  @Get("/getPost/{postId}")
  public getVotes(@Path() postId: string) {
    return this.__PostsService.getPost(postId);
  }

  @Post("/link")
  public async linkLoader(@Body() requestBody: any) {
    console.log(requestBody);
    // TODO: Implement this
  }
}
