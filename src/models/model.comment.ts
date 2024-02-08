import Base from "./model.base";
import { User } from "./model.user";
import { Post } from "./model.post";
import { CommentVote } from "./model.commentVote";
export class Comment extends Base {
  id!: string;
  text!: string;
  createdAt?: string;
  authorId!: string;
  postId!: string;
  replyToId?: string;
  replies?: Comment[];
  votes?: CommentVote[];

  static get tableName() {
    return "comments";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text", "authorId", "postId"],
      properties: {
        id: { type: "string" },
        text: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        authorId: { type: "string" },
        postId: { type: "string" },
        replyToId: { type: ["string", "null"] },
      },
    };
  }

  static get relationMappings() {
    return {
      author: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.authorId",
          to: "users.id",
        },
      },
      post: {
        relation: Base.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.postId",
          to: "posts.id",
        },
      },
      replyTo: {
        relation: Base.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: "comments.replyToId",
          to: "comments.id",
        },
      },
      replies: {
        relation: Base.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "comments.id",
          to: "comments.replyToId",
        },
      },
      votes: {
        relation: Base.HasManyRelation,
        modelClass: CommentVote,
        join: {
          from: "comments.id",
          to: "commentVotes.commentId",
        },
      },
    };
  }
}
