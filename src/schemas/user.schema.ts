import { ModelObject } from "objection";
import { User } from "../models/model.user";

export type UserSchema = Omit<
  ModelObject<User>,
  | "createdSubreddits"
  | "subscriptions"
  | "posts"
  | "comments"
  | "postVotes"
  | "commentVotes"
>;
export type UserCreateSchema = Omit<UserSchema, "id">;
export type UserUpdateSchema = Partial<UserSchema>;
export type UserLoginSchema = Pick<UserSchema, "email" | "password">;
export type UserRegisterSchema = Omit<UserSchema, "id">;
export type UserLoginResponseSchema = Omit<UserSchema, "password"> & { token: string };
export type UserRegisterResponseSchema = UserLoginResponseSchema;
export type UserDataResponseSchema = Omit<UserSchema, "password">;

