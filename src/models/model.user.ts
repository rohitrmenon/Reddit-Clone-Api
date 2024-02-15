import { QueryContext } from "objection";
import bcrypt from "bcrypt";

import Base from "./model.base";
import { Post } from "./model.post";
import { Comment } from "./model.comment";
import { PostVote } from "./model.postVote";
import { CommentVote } from "./model.commentVote";
import { SubReddit } from "./model.subreddit";
import { Subscription } from "./model.subscription";

export class User extends Base {
  id!: string;
  email!: string;
  name!: string;
  username!: string;
  password!: string;
  image?: string;
  createdSubreddits?: SubReddit[];
  subscriptions?: Subscription[];
  posts?: Post[];
  comments?: Comment[];
  postVotes?: PostVote[];
  commentVotes?: CommentVote[];

  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "username", "password"],
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
        username: { type: "string" },
        password: { type: "string" },
        image: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      createdSubreddits: {
        relation: Base.HasManyRelation,
        modelClass: SubReddit,
        join: {
          from: "users.id",
          to: "subreddits.creatorId",
        },
      },
      subscriptions: {
        relation: Base.HasManyRelation,
        modelClass: Subscription,
        join: {
          from: "users.id",
          to: "subscriptions.userId",
        },
      },
      posts: {
        relation: Base.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.id",
          to: "posts.userId",
        },
      },
      comments: {
        relation: Base.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.id",
          to: "comments.userId",
        },
      },
      postVotes: {
        relation: Base.HasManyRelation,
        modelClass: PostVote,
        join: {
          from: "users.id",
          to: "postVotes.userId",
        },
      },
      commentVotes: {
        relation: Base.HasManyRelation,
        modelClass: CommentVote,
        join: {
          from: "users.id",
          to: "commentVotes.userId",
        },
      },
    };
  }

  async $beforeInsert(context: QueryContext) {
    await super.$beforeInsert(context);
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}
