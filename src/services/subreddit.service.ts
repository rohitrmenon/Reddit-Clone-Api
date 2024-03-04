import { v4 as uuidv4 } from "uuid";

import { SubReddit } from "../models/model.subreddit";
import { Subscription } from "../models/model.subscription";
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

  public async getByUserId(
    userId: string
  ): Promise<SubRedditSchema[] | string> {
    try {
      const subreddits = await SubReddit.query().where("creatorId", userId);
      return subreddits;
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving subreddits for user: ${e.message}`;
    }
  }

  public async getBySlug(slug: string) {
    try {
      const subreddit = await SubReddit.query()
        .findOne({ name: slug })
        .withGraphFetched("[posts,subscribers,creator]");
      if (!subreddit)
        throw new Error(`Subreddit with slug '${slug}' not found`);
      return subreddit;
    } catch (e: any) {
      logger.error(e.message);
      return `${e.message}`;
    }
  }

  public async getSubscription(
    userId: string,
    subredditId: string
  ): Promise<Subscription[] | string> {
    try {
      const subscriptions = await Subscription.query()
        .where("subredditId", subredditId)
        .where("userId", userId);
      return subscriptions;
    } catch (error) {
      console.error("Error in subscription operation:", error);
      throw error;
    }
  }

  public async postSubscription(
    userId: string,
    subredditId: string
  ): Promise<Subscription[] | number | Subscription | string> {
    try {
      const existingSubscription = await Subscription.query()
        .where("subredditId", subredditId)
        .where("userId", userId);

      if (existingSubscription.length > 0) {
        const removedSubscription = await Subscription.query()
          .delete()
          .where("userId", userId)
          .where("subredditId", subredditId);
        return removedSubscription;
      } else {
        const newSubscription = await Subscription.query().insert({
          id: uuidv4(),
          userId: userId,
          subredditId: subredditId,
        });
        return newSubscription;
      }
    } catch (error) {
      console.error("Error in subscription operation:", error);
      throw error;
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
      await Subscription.query().insert({
        id: uuidv4(),
        userId: newSubReddit.creatorId,
        subredditId: newSubReddit.id,
      });
      return newSubReddit;
    } catch (e: any) {
      logger.error(e);
      return `Error creating subreddit: ${e.message}`;
    }
  }

  public async delete(subreddditId: string): Promise<string> {
    try {
      await SubReddit.query().deleteById(subreddditId);
      return `Deleted subreddit with id ${subreddditId}`;
    } catch (e: any) {
      logger.error(e);
      return `Error deleting subreddit: ${e.message}`;
    }
  }

  public async deleteAll(userId: string) {
    try {
      await SubReddit.query().delete().where("creatorId", userId);
      return `Deleted all subreddits`;
    } catch (e: any) {
      logger.error(e);
      return `Error deleting all subreddits: ${e.message}`;
    }
  }
}
