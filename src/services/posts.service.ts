import { v4 as uuidv4 } from "uuid";

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
      const id = uuidv4();
      const newPost = await Post.query().insert({ ...requestBody, id });
      return newPost;
    } catch (e) {
      logger.error(e);
      return "Error creating Post";
    }
  }

  public async paginate(
    limit: number,
    pageParam: number,
    subredditId?: string | undefined
  ) {
    try {
      const offset = (pageParam - 1) * limit ?? 0;
      console.log(offset, subredditId);
      let query = Post.query()
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset);

      if (subredditId) {
        query = query.where("subredditId", "=", subredditId);
      }

      query = query.withGraphFetched(
        "[author, subreddit, comments, postVotes]"
      );
      
      const posts = await query;
      console.log(posts);
      return posts;
    } catch (e) {
      console.log(e);
    }
  }
}
