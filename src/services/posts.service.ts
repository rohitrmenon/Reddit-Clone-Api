import { v4 as uuidv4 } from "uuid";

import logger from "../helpers/logger";
import { PostSchema, Post } from "../models/model.post";
import { PostVote, PostVoteSchema } from "../models/model.postVote";
import { VoteType } from "../models/enum.vote";

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

  public async paginate(limit: number, pageParam: number, subredditId: string) {
    try {
      const offset = (pageParam - 1) * limit ?? 0;
      let query = Post.query()
        .orderBy("createdAt", "desc")
        .limit(limit)
        .offset(offset)
        .withGraphFetched("[author, subreddit, comments, postVotes]");

      if (subredditId !== "undefined")
        query = query.where("subredditId", "=", subredditId as string);

      const posts = await query;
      return posts;
    } catch (e) {}
  }

  public async vote(requestBody: Omit<PostVoteSchema, "user" | "Post" | "id">) {
    try {
      const existingVote = await PostVote.query()
        .where("userId", requestBody.userId)
        .where("postId", requestBody.postId)
        .first();

      if (existingVote) {
        if (existingVote.type === requestBody.type) {
          await existingVote.$query().delete();
        } else {
          await existingVote.$query().patch({ type: requestBody.type });
        }
      } else {
        const id = uuidv4();
        await PostVote.query().insert({ ...requestBody, id });
      }

      const postId = requestBody.postId;
      const upVotesCount = await PostVote.query()
        .where("postId", postId)
        .where("type", VoteType.UP)
        .resultSize();
      const downVotesCount = await PostVote.query()
        .where("postId", postId)
        .where("type", VoteType.DOWN)
        .resultSize();
      const votesCount = upVotesCount - downVotesCount;

      await Post.query()
        .findById(postId)
        .patch({ votesCount });

      const post = await Post.query().findById(postId)
      return post;
    } catch (e: any) {
      console.log(e);
    }
  }

  public async getPost(postId: string) {
    try {
      const vote = await Post.query()
        .where("id", postId)
        .withGraphFetched("[postVotes]");
      return vote;
    } catch {}
  }
}
