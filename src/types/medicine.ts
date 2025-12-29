import { Types } from "mongoose";
import { IUser } from "./user";

export interface IMedicine {
  _id: Types.ObjectId;
  name: string;
  quantity: number;
  expireDate: Date;
  reminderSent?: boolean;
  note?: string;
  unit: string;
  user: Types.ObjectId | IUser;
  category: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
