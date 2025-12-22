import { Types } from "mongoose";

export interface ICategory {
  _id: Types.ObjectId;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
