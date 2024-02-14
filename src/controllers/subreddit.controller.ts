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

import { SubReddit } from "../models/model.subreddit";

@Route("api/v1/subreddits")
@Middlewares(authMiddleware)
@Tags("Subreddits")
export class SubRedditController extends Controller {
  private __subRedditService = new SubRedditService();

  @Get("getById/{subredditId}")
  public async getSubRedditById(
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

  @Get("getBySlug/{slug}")
  public async getSubRedditBySlug(
    @Path() slug: string
  ): Promise<SubReddit | string | undefined> {
    try {
      const subreddit = await this.__subRedditService.getBySlug(slug);
      return subreddit;
    } catch (e: any) {
      return `Error getting subreddit by slug: ${e.message}`;
    }
  }

  @Post("/create")
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
  @SuccessResponse("204", "Subreddit deleted successfully")
  public async deleteSubReddit(@Path() subredditId: string) {
    try {
      const deletedSubreddit =
        await this.__subRedditService.delete(subredditId);
      return deletedSubreddit;
    } catch (error) {
      return "Error deleting the subredddit";
    }
  }

  @Delete("/deleteAll/{userId}")
  @SuccessResponse("204", "All subreddits deleted successfully")
  public async deleteAllSubRedditsByUserId(@Path() userId: string) {
    try {
      const deletedSubreddits = await this.__subRedditService.deleteAll(userId);
      return deletedSubreddits;
    } catch (error) {
      return "Error deleting all subreddits";
    }
  }
}
