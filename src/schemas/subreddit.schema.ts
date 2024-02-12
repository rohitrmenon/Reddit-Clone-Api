import { ModelObject } from "objection";
import { SubReddit } from "../models/model.subreddit";

export type SubRedditSchema = Omit<
  ModelObject<SubReddit>,
  "posts" | "subscribers"
>;
export type SubRedditCreateSchema = Omit<SubRedditSchema, "id" | "createdAt" | "updatedAt" | "creator">;
export type SubRedditUpdateSchema = Partial<SubRedditSchema>;
