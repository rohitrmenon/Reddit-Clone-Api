import { ModelObject } from "objection";
import Base from "./model.base";
import { User } from "./model.user";
import { SubReddit } from "./model.subreddit";
export class Post extends Base {
  id!: string;
  title!: string;
  content?: object;
  createdAt?: string;
  updatedAt?: string;
  authorId?: number;
  author?: User;
  subredditId?: number;
  subreddit?: SubReddit;

  static get tableName() {
    return "posts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content"],
      properties: {
        id: { type: "string" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        content: { type: "object" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        authorId: { type: "integer" },
        subredditId: { type: "integer" },
      },
    };
  }

  static get relationMappings(){
    return{
      author: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.authorId",
          to: "users.id",
        },
      },
      subreddit: {
        relation: Base.BelongsToOneRelation,
        modelClass: SubReddit,
        join: {
          from: "posts.subredditId",
          to: "subreddits.id",
        },
      },
    }
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export type PostSchema = ModelObject<Post>;
