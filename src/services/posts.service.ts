import logger from "../helpers/logger";
import { PostSchema, Post } from "../models/model.post";
export class PostsService {
  public async get(id: number): Promise<PostSchema | string> {
    try {
      const post = await Post.query().findById(id);
      if (post) {
        return post;
      } else {
        throw new Error(`Post with ID ${id} not found`);
      }
    } catch (e: any) {
      logger.error(e);
      return `Error retrieving post: ${e.message}`;
    }
  }

  public async getAllPosts(): Promise<PostSchema[] | string> {
    try {
      const allPosts = await Post.query();
      return allPosts;
    } catch (e) {
      logger.error(e);
      return `Error retrieving all posts:`;
    }
  }

  public async create(
    requestBody: Omit<PostSchema, "id" | "createdAt" | "updatedAt">
  ): Promise<PostSchema | string> {
    try {
      const newPost = await Post.query().insert(requestBody);
      return newPost;
    } catch (e) {
      logger.error(e);
      return "Error creating Post";
    }
  }
}
