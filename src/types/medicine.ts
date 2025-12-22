import { Types } from "mongoose";

export interface IMedicine {
  _id: Types.ObjectId;
  name: string;
  quantity: number;
  expireDate: Date;
  reminderSent?: boolean;
  note?: string;
  unit: string;
  user: Types.ObjectId;
  category: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}
