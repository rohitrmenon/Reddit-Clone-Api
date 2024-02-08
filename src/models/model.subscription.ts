import Base from "./model.base";
import { SubReddit } from "./model.subreddit";
import { User } from "./model.user";
export class Subscription extends Base {
  id!: string;
  userId!: string;
  user!: User;
  subredditId!: string;
  subreddit!: SubReddit;

  static get tableName() {
    return "subscriptions";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["userId", "subredditId"],
      properties: {
        id: { type: "integer" },
        userId: { type: "string" },
        subredditId: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Base.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "subscriptions.userId",
          to: "users.id",
        },
      },
      subreddit: {
        relation: Base.BelongsToOneRelation,
        modelClass: SubReddit,
        join: {
          from: "subscriptions.subredditId",
          to: "subreddits.id",
        },
      },
    };
  }
}
