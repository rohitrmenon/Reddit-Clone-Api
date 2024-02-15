import Base from "./model.base";
import { Post } from "./model.post";
import { User } from "./model.user";
import { Subscription } from "./model.subscription";

export class SubReddit extends Base {
  id!: string;
  name!: string;
  creatorId!: string;
  creator?: User;
  createdAt?: string;
  updatedAt?: string;
  posts?: Post[];
  subscribers?: Subscription[];

  static get tableName() {
    return "subreddits";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "creatorId"],
      properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        creatorId: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "subreddits.creatorId",
          to: "users.id",
        },
      },
      posts: {
        relation: Base.HasManyRelation,
        modelClass: Post,
        join: {
          from: "subreddits.id",
          to: "posts.subredditId",
        },
      },
      subscribers: {
        relation: Base.HasManyRelation,
        modelClass: Subscription,
        join: {
          from: "subreddits.id",
          to: "subscriptions.subredditId",
        },
      }
    };
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get index() {
    return "name";
  }
}
