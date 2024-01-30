import logger from "../helpers/logger";
import { PostSchema, Post } from "../models/Post";
export class PostsService {
  public async getPosts(): Promise<PostSchema[] | undefined> {
    try {
      const allPosts = await Post.query();
      return allPosts;
    } catch (e) {
      logger.error(e);
    }
    return undefined;
  }

  public async create(
    requestBody: Omit<PostSchema, "id" | "createdAt" | "updatedAt">
  ): Promise<PostSchema | undefined> {
    try {
      const newPost = await Post.query().insert(requestBody);
      return newPost;
    } catch (e) {
      logger.error(e);
    }
    return undefined;
  }
}
