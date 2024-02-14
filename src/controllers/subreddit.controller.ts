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
  Delete,
} from "tsoa";
import { SubRedditService } from "../services/subreddit.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  SubRedditCreateSchema,
  SubRedditSchema,
} from "../schemas/subreddit.schema";

@Route("api/v1/subreddits")
@Tags("Subreddits")
export class SubRedditController extends Controller {
  private __subRedditService = new SubRedditService();

  @Get("{subredditId}")
  @Middlewares(authMiddleware)
  public async getSubReddit(
    @Path() subredditId: string
  ): Promise<SubRedditSchema | string> {
    try {
      const subreddit = await this.__subRedditService.get(subredditId);
      return subreddit;
    } catch (e: any) {
      console.log(e);
      return `Error getting subreddit: ${e.message}`;
    }
  }

  @Get()
  @Middlewares(authMiddleware)
  public async getAllSubReddits(): Promise<SubRedditSchema[] | string> {
    try {
      const subreddits = await this.__subRedditService.getAllSubReddits();
      return subreddits;
    } catch (e: any) {
      console.log(e);
      return `Error getting all subreddits: ${e.message}`;
    }
  }
  @Get("user/{userId}")
  @Middlewares(authMiddleware)
  public async getSubRedditsByUser(
    @Path() userId: string
  ): Promise<SubRedditSchema[] | string> {
    try {
      const subreddits = await this.__subRedditService.getByUserId(userId);
      return subreddits;
    } catch (e: any) {
      console.log(e);
      return `Error getting subreddits for user: ${e.message}`;
    }
  }

  @Post("/create")
  @Middlewares(authMiddleware)
  @SuccessResponse("201", "Subreddit created successfully")
  public async createSubReddit(
    @Body() requestBody: SubRedditCreateSchema
  ): Promise<SubRedditSchema | string> {
    try {
      const newSubReddit = await this.__subRedditService.create(requestBody);
      return newSubReddit;
    } catch (e) {
      return "Error creating subreddit";
    }
  }

  @Delete("{subredditId}")
  @Middlewares(authMiddleware)
  @SuccessResponse("204", "Subreddit deleted successfully")
  public async deleteSubReddit(@Path() subredditId: string) {
    try {
      const deletedSubreddit = await this.__subRedditService.delete(subredditId);
      return deletedSubreddit;
    } catch (error) {
      return "Error deleting the subredddit";
    }
  }

  @Delete("/deleteAll/{userId}")
  @Middlewares(authMiddleware)
  @SuccessResponse("204", "All subreddits deleted successfully")
  public async deleteAllSubRedditsByUserId(@Path() userId:string) {
    try {
      const deletedSubreddits = await this.__subRedditService.deleteAll(userId);
      return deletedSubreddits;
    } catch (error) {
      return "Error deleting all subreddits";
    }
  }

}
