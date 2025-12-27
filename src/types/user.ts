import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password?: string;
  email: string;
  role: "admin" | "user";
  telepon?: string;
  createdAt?: string;
  updatedAt?: string;
}
