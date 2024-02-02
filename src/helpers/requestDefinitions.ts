import { Request } from "express";
import {  UserSchema } from "../models/model.user";

export interface IGetUserAuthInfoRequest extends Request {
  user: Omit<UserSchema, "email" | "status" | "password">;
}

export interface ExResponse extends Response {
  error: (code: number, message: string) => Response;
  success: (code: number, message: string, result: any) => Response
}