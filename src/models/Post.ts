import { Model } from "objection";

export class Post extends Model {
  id!: number;
  title!: string;
  content!: string;
  createdAt?: string; 
  updatedAt?: string; 
  static get tableName() {
    return "posts";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        content: { type: "text" },
        createdAt: { type: ["string", "null"], format: "date-time" }, 
        updatedAt: { type: ["string", "null"], format: "date-time" },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}
