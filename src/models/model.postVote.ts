import Base from "./model.base";
import { User } from "./model.user";
import { ModelObject } from "objection";
import { Post } from "./model.post";
import { VoteType } from "./enum.vote";
export class PostVote extends Base {
  id!: string;
  userId!: string;
  user!: User;
  postId!: string;
  Post!: Post;
  type!: VoteType;

  static get tableName() {
    return "postVotes";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "userId", "postId", "type"],
      properties: {
        id: { type: "string" },
        userId: { type: "string" },
        postId: { type: "string" },
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
          from: "postVotes.userId",
          to: "users.id",
        },
      },
      post: {
        relation: Base.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "postVotes.postId",
          to: "posts.id",
        },
      },
    };
  }
}

export type PostVoteSchema = ModelObject<PostVote>;
