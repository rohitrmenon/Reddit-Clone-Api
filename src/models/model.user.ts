import {  QueryContext } from "objection";
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
  subscriptions?:Subscription[]
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

  async $beforeInsert(context: QueryContext) {
    await super.$beforeInsert(context);
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

