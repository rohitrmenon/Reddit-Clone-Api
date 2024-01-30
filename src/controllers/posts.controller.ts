import { Route, Get, Controller, Tags } from "tsoa";
import { PostsService } from "../services/posts.service";
@Route("posts")
@Tags("Posts")
export class PostsController extends Controller {
  private __PostsService = new PostsService();
  @Get()
  public getPosts(): string {
    return this.__PostsService.getPosts();
  }
}
