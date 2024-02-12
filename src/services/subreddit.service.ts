import { v4 as uuidv4 } from "uuid";

import { SubReddit } from "../models/model.subreddit";
import {
  SubRedditCreateSchema,
  SubRedditSchema,
} from "../schemas/subreddit.schema";
import logger from "../helpers/logger";

export class SubRedditService {
  public async get(id: string): Promise<SubRedditSchema | string> {
    try {
      const subreddit = await SubReddit.query().findById(id);
      return subreddit as SubRedditSchema;
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving subreddit: ${e.message}`;
    }
  }

  public async getAllSubReddits(): Promise<SubRedditSchema[] | string> {
    try {
      const allSubReddits = await SubReddit.query();
      return allSubReddits;
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving all subreddits: ${e.message}`;
    }
  }

  public async getByUserId(userId: string): Promise<SubRedditSchema[] | string> {
    try {
      const subreddits = await SubReddit.query().where('creatorId', userId);
      return subreddits;
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving subreddits for user: ${e.message}`;
    }
  }
  public async create(
    requestBody: SubRedditCreateSchema
  ): Promise<SubRedditSchema | string> {
    try {
      const existingSubReddit = await SubReddit.query().findOne({
        name: requestBody.name,
      });

      if (existingSubReddit) {
        return `Subreddit with name '${requestBody.name}' already exists`;
      }
      const id = uuidv4();
      const newSubReddit = await SubReddit.query().insertGraph({
        ...requestBody,
        id,
      });
      return newSubReddit;
    } catch (e: any) {
      logger.error(e);
      return `Error creating subreddit: ${e.message}`;
    }
  }
}
