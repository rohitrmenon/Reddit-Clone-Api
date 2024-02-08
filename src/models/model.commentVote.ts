import Base from "./model.base";
import { User } from "./model.user";
import { Comment } from "./model.comment"; // Assuming you already have the Comment model
import { ModelObject } from "objection";
export class CommentVote extends Base {
  id!:string;
  userId!: string;
  user!: User;
  commentId!: string;
  Comment!: Comment;
  type!: VoteType;

  static get tableName() {
    return "commentVotes";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "commentId", "type"],
      properties: {
        userId: { type: "string" },
        commentId: { type: "string" },
        type: { type: "string", enum: Object.values(VoteType) },
      },
    };
  }
  static get relationMappings() {
    return {
      user: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "commentVotes.userId",
          to: "users.id",
        },
      },
      comment: {
        relation: Base.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: "commentVotes.commentId",
          to: "comments.id",
        },
      },
    };
  }
}

export type CommentVoteSchema = ModelObject<CommentVote>;
